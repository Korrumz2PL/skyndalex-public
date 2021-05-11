const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  let pingEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
    .addField(`Opóźnienie bota`, `\`\`\`${client.ws.ping}\`\`\``)
    .setColor("RANDOM");
  message.channel.send(pingEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "ping",
  category: "🤖 | Systemowe",
  description: "Ping bota.",
  usage: "ping"
};
