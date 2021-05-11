exports.run = async (client, message, args, level) => {
  if (!args || args.length < 1) return client.error(message, `Must provide a command to reload.`); const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0])); let response = await client.unloadCommand(args[0]); if (response) return client.error(message, `Błąd podczas ładowania komendy: ${response}`); response = client.loadCommand(command.help.name); if (response) return message.reply(`Błąd: ${response}`); client.done(message, `The command \`${command.help.name}\` has been reloaded`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rl"],
  permLevel: "Programista"
};

exports.help = {
  name: "reload",
  category: "🤖 | Systemowe",
  description: "Reloaduje daną komendę.",
  usage: "reload [komenda]"
};