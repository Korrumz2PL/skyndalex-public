const Discord = require("discord.js");
const { MessageAttachment } = require('discord.js');
exports.run = (client, message, args, level) => {
  let plik = new MessageAttachment("https://api.xenith.pl/piesapi").setName("pies.jpg");
  message.channel.send(plik);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "pies",
  category: "🎉 | 4fun",
  description: "Pokazuje zdjęcie psa!",
  usage: "pies"
};
