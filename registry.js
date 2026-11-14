const commands = new Map();

function register(command) {
  if (!command?.name || typeof command.execute !== 'function') {
    throw new TypeError('Command requires name and execute()');
  }
  commands.set(command.name.toLowerCase(), command);
  for (const alias of command.aliases || []) commands.set(alias.toLowerCase(), command);
}
function get(name) { return commands.get(String(name || '').toLowerCase()); }
function list() {
  return [...new Set(commands.values())].sort((a, b) => a.name.localeCompare(b.name));
}
module.exports = { register, get, list };
