const path = require('path');

try {
  require('dotenv').config();
} catch (error) {
  if (error.code !== 'MODULE_NOT_FOUND') throw error;
}

const express = require('express');
const config = require('./config/app.config');
const mountRoutes = require('./routes/static');
const {
  copyAssets,
  installProcessGuards,
  validateEnv
} = require('./utils/startup');

function optionalRequire(name, fallback) {
  try {
    return require(name);
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
    return fallback;
  }
}

const helmet = optionalRequire('helmet', () => (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'same-origin');
  next();
});
const compression = optionalRequire('compression', () => (req, res, next) => next());
const morgan = optionalRequire('morgan', () => (req, res, next) => next());

installProcessGuards();
validateEnv();
copyAssets(config.assets);

const app = express();
const isDev = process.env.NODE_ENV === 'development';
const host = process.env.HOST || '0.0.0.0';
const port = config.port;

app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(compression());
app.use(express.json({ limit: '10kb' }));
if (isDev) app.use(morgan('dev'));
app.use(express.static(path.join(process.cwd(), 'public'), {
  maxAge: '1d',
  etag: true,
  index: false,
  setHeaders(res, filePath) {
    if (/\.(?:js|css)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'no-store, must-revalidate');
    }
  }
}));

mountRoutes(app);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((error, req, res, next) => {
  console.error('[request error]', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, host, () => {
  console.log(`CAFFEIN listening on http://${host}:${port}`);
});
