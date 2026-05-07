const path = require('path');
const {
  getAssetFlags,
  readHtmlWithAssetFlags
} = require('../utils/startup');
const config = require('../config/app.config');

function mountRoutes(app) {
  app.get('/', (req, res, next) => {
    try {
      const flags = getAssetFlags(config.assets);
      flags.appVersion = process.env.CAFFEIN_BUILD_ID || Date.now().toString();
      const html = readHtmlWithAssetFlags(
        path.join(process.cwd(), 'public', 'index.html'),
        flags
      );
      res.type('html').send(html);
    } catch (error) {
      next(error);
    }
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
  });
}

module.exports = mountRoutes;
