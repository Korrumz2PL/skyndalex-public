const Discord = require("discord.js");
const { MessageAttachment } = require('discord.js');
exports.run = (client, message, args, level) => {
  if(client.dbs.prepare('SELECT memyEnabled FROM ServerSettings WHERE id=?').get(message.guild.id).memyEnabled==="false") return client.error(message, 'Komenda mem została wyłączona na tym serwerze przez administrację serwera')
  let plik = new MessageAttachment("https://api.xenith.tk/memapi").setName("mem.jpg");
  message.channel.send(plik).catch(error => {
    client.error(message, `${error}`)
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "mem",
  category: "🎉 | 4fun",
  description: "Pokazuje mema!",
  usage: "mem"
};