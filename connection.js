module.exports = function registerConnectionEvents(sock, start) {
  sock.ev.on('connection.update', async update => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) console.log('QR login available; pairing-code login is preferred when PAIRING_NUMBER is set.');
    if (connection === 'open') console.log('✅ WhatsApp connected.');
    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      console.log('WhatsApp connection closed:', code || 'unknown');
      if (code !== 401) setTimeout(start, 3000);
      else console.error('Session logged out. Remove session folder and pair again.');
    }
  });
};
