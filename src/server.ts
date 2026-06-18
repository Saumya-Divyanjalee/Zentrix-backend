import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║      Zentrix — Backend v2.0              ║
║   Server running on port ${PORT}             ║
║   http://localhost:${PORT}                   ║
╚══════════════════════════════════════════╝
  `);

});