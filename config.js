require('dotenv').config();

const digits = (value = '') => value.replace(/\\D/g, '');
const config = {
  botName: process.env.BOT_NAME || 'Siyam WhatsApp Bot',
  prefix: process.env.PREFIX || '!',
  pairingNumber: digits(process.env.PAIRING_NUMBER || ''),
  ownerNumber: digits(process.env.OWNER_NUMBER || ''),
  sessionDir: process.env.SESSION_DIR || '.session',
  logLevel: process.env.LOG_LEVEL || 'info'
};
module.exports = config;
