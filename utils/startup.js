const fs = require('fs');
const path = require('path');

function validateEnv() {
  if (!process.env.PORT) {
    process.env.PORT = '3000';
  }

  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
  }
}

function installProcessGuards() {
  process.on('uncaughtException', (error) => {
    console.error('[fatal] uncaught exception:', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    console.error('[fatal] unhandled rejection:', reason);
    process.exit(1);
  });
}

function copyAssets({ sourceDir, publicDir }) {
  const source = path.resolve(process.cwd(), sourceDir);
  const target = path.resolve(process.cwd(), publicDir);

  fs.mkdirSync(source, { recursive: true });
  fs.mkdirSync(target, { recursive: true });

  for (const file of fs.readdirSync(source)) {
    const from = path.join(source, file);
    const to = path.join(target, file);
    if (fs.statSync(from).isFile() && !fs.existsSync(to)) {
      fs.copyFileSync(from, to);
    }
  }
}

function getAssetFlags({ publicDir, song, pfpCandidates = [] }) {
  const target = path.resolve(process.cwd(), publicDir);
  const pfpFile = pfpCandidates.find((file) => fs.existsSync(path.join(target, file)));

  return {
    missingSong: !fs.existsSync(path.join(target, song)),
    missingPfp: !pfpFile,
    pfpPath: pfpFile ? `/assets/${pfpFile}` : '/assets/pfp.png'
  };
}

function readHtmlWithAssetFlags(filePath, flags) {
  const html = fs.readFileSync(filePath, 'utf8');
  return html
    .replace('__ASSET_FLAGS__', JSON.stringify(flags))
    .replace('__PFP_SRC__', flags.pfpPath)
    .replaceAll('__APP_VERSION__', flags.appVersion || Date.now().toString());
}

module.exports = {
  copyAssets,
  getAssetFlags,
  installProcessGuards,
  readHtmlWithAssetFlags,
  validateEnv
};
