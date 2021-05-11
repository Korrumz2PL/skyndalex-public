exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  await message.channel.send("[*]")
  client.done(message, 'done')
  await Promise.all(client.commands.map(cmd =>
    client.unloadCommand(cmd)
  ));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Programista"
};

exports.help = {
  name: "reset",
  category: "🔴 | Deweloperskie",
  description: "Resetuje bota",
  usage: "reset"
};