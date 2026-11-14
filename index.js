const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const config = require('./utils/config');
const registry = require('./core/registry');

registry.register(require('./commands/ping'));
registry.register(require('./commands/menu'));
registry.register(require('./commands/owner'));

let starting = false;
async function start() {
  if (starting) return;
  starting = true;
  try {
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionDir);
    const sock = makeWASocket({
      auth: state,
      logger: pino({ level: config.logLevel }),
      printQRInTerminal: false,
      browser: [config.botName, 'Chrome', '1.0.0']
    });
    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
      if (qr) qrcode.generate(qr, { small: true });
      if (connection === 'connecting') console.log('Connecting to WhatsApp...');
      if (connection === 'open') console.log('✅ Connected as', sock.user?.id);
      if (connection === 'close') {
        const status = lastDisconnect?.error?.output?.statusCode;
        starting = false;
        if (status !== DisconnectReason.loggedOut) setTimeout(start, 3000);
        else console.error('Logged out. Delete session folder and pair again.');
      }
    });

    if (!state.creds.registered && config.pairingNumber) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const code = await sock.requestPairingCode(config.pairingNumber);
      console.log('\\n🔐 WhatsApp Pairing Code:', code, '\\n');
      console.log('WhatsApp → Linked devices → Link a device → Link with phone number');
    }
    require('./events/messages')(sock);
  } catch (error) {
    starting = false;
    console.error('Startup failed:', error);
    setTimeout(start, 5000);
  }
}
start();
process.on('unhandledRejection', err => console.error('Unhandled rejection:', err));
process.on('uncaughtException', err => console.error('Uncaught exception:', err));
