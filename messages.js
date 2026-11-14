const { handleMessage } = require('../core/message-handler');
module.exports = function registerMessageEvents(sock) {
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    for (const message of messages || []) {
      await handleMessage(sock, message);
    }
  });
};
