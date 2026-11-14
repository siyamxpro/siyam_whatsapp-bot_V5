module.exports = {
  name: 'ping',
  aliases: ['p'],
  description: 'বট অনলাইন আছে কি না পরীক্ষা',
  async execute({ sock, jid, message }) {
    await sock.sendMessage(jid, { text: '🏓 Pong! WhatsApp Bot Online.' }, { quoted: message });
  }
};
