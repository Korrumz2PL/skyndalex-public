const Discord = require("discord.js");
exports.run = async (client, message, args) => {

  if (!args[0]) return client.error(message, `Nie podano tekstu.`)
const Embed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`${message.author.tag}: ${args.join(' ')}`.replace('@everyone', 'Wiadomość zawierała ping'))
message.channel.send(Embed).catch(err => {
  message.channel.send(err)
})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["powiedz"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "say",
  category: "🛠️ | Narzędzia",
  description: "Bot pisze to, co ty piszesz",
  usage: "say"
};