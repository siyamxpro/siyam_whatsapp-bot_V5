const config = require('../utils/config');
const registry = require('./registry');

const numberFromJid = jid => String(jid || '').split('@')[0].split(':')[0].replace(/\\D/g, '');

async function handleMessage(sock, message) {
  const key = message.key || {};
  if (key.fromMe) return;
  const jid = key.remoteJid;
  if (!jid || jid === 'status@broadcast') return;

  const msg = message.message || {};
  const text = msg.conversation
    || msg.extendedTextMessage?.text
    || msg.imageMessage?.caption
    || msg.videoMessage?.caption
    || '';
  if (!text.startsWith(config.prefix)) return;

  const [name, ...args] = text.slice(config.prefix.length).trim().split(/\\s+/);
  if (!name) return;
  const command = registry.get(name);
  if (!command) return;

  const sender = numberFromJid(key.participant || jid);
  const isOwner = !!config.ownerNumber && sender === config.ownerNumber;
  if (command.ownerOnly && !isOwner) {
    await sock.sendMessage(jid, { text: '❌ এই কমান্ডটি শুধু বট Owner ব্যবহার করতে পারবেন।' }, { quoted: message });
    return;
  }
  try {
    await command.execute({ sock, message, jid, sender, args, text, isOwner });
  } catch (error) {
    console.error(`[COMMAND:${command.name}]`, error);
    await sock.sendMessage(jid, { text: `⚠️ ${command.name} কমান্ড চালাতে সমস্যা হয়েছে: ${error.message}` }, { quoted: message });
  }
}
module.exports = { handleMessage };
