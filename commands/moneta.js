const discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let los = Math.floor(Math.random() * (100 - 0) + 0)
  let embed = new Discord.MessageEmbed()
      .setDescription(`${los}`)
  message.channel.send(embed)
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["flipcoin", "FlipCoin"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "losujliczbę",
  category: "💰 | Ekonomia",
  description: "Losujesz liczbę",
  usage: "liczba"
};