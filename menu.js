const registry = require('../core/registry');
module.exports = {
  name: 'menu',
  aliases: ['help'],
  description: 'কমান্ড তালিকা',
  async execute({ sock, jid, message }) {
    const rows = registry.list().map(c => `• ${c.name} — ${c.description || 'কোনো বিবরণ নেই'}`);
    await sock.sendMessage(jid, { text: `🤖 *SIYAM WHATSAPP BOT*\\n\\n${rows.join('\\n')}\\n\\nPrefix: ${require('../utils/config').prefix}` }, { quoted: message });
  }
};
