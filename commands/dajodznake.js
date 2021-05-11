const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  if(args[0]==="nadpisz") {
  let user = message.mentions.users.first()||client.users.cache.get(args[1])
  if(user.bot) return message.channel.send('Boty nie mają odznak')
  client.writeBadges(user.id, args.slice(2).join(' '))
  message.channel.send(`Nadpisano odznaki dla ${user.tag} na ${args.slice(2).join(' ')}`)
  } else {
  let user = message.mentions.users.first()||client.users.cache.get(args[0])
  if(user.bot) return message.channel.send('Boty nie mają odznak')
  client.giveBadges(user.id, args.slice(1).join(' '))
  message.channel.send(`Dodano odznaki dla ${user.tag} ${args.slice(1).join(' ')}`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Programista"
};

exports.help = {
  name: "dajodznake",
  category: "🔴 | Deweloperskie",
  description: "Nadaje odznake użytkownikowi",
  usage: "dajodznake <odznaki>"
};

