module.exports = {
  appName: 'CAFFEIN',
  port: Number(process.env.PORT || 3000),
  phaseTimeouts: {
    phase0: 12000,
    phase1: 45000,
    phase2: 90000,
    phase3: 120000,
    phase4: 30000,
    phase5: 8000
  },
  assets: {
    sourceDir: 'assets',
    publicDir: 'public/assets',
    song: 'song.mp3',
    pfpCandidates: ['pfp.png', 'pfp.jpg', 'pfp.jpeg', 'pfp.webp']
  }
};
