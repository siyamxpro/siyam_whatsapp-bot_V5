const config = require('../utils/config');
module.exports = {
  name: 'owner',
  description: 'Owner নম্বর দেখায়',
  async execute({ sock, jid, message }) {
    await sock.sendMessage(jid, { text: config.ownerNumber ? `👑 Owner: ${config.ownerNumber}` : 'Owner নম্বর .env-এ সেট করা হয়নি।' }, { quoted: message });
  }
};
