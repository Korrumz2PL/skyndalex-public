const Discord = require("discord.js");
exports.run = (client, message, args) => {
      const tekstemb = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Nosacz!")
        .setFooter("Więcej takich obrazków? Wpisz !!help! :)")
        .setImage(`https://raw.githubusercontent.com/MrBoombastic/nosaczapi-unofficial/2.1/images/${Math.floor(Math.random() * (1586 - 0) + 0)}.jpg`)
        .setTimestamp();
      message.channel.send(tekstemb);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["janusz"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "nosacz",
  category: "🎉 | 4fun",
  description: "Wysyła randomowe nosacze",
  usage: "nosacz"
};