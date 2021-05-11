const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
        if (!args[0]) return client.error(message, `Podaj czas!`)
    const slowmodeTime = (args[0])
        message.channel.setRateLimitPerUser(args[0])
        let embed = new Discord.MessageEmbed()
            .setTitle(`Zmienianie czasu powolnego`)
            .setDescription(`Pomyślnie zmieniono czas powolny wysyłania wiadomości przez ${message.author.username}!\nCzas powolny: ${slowmodeTime}s`)
            .setColor(`GREEN`)
        message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["zwolnijchat"],
  permLevel: "Moderator"
};

exports.help = {
  name: "slowmode",
  category: "🛠️ | Narzędzia",
  description: "Włącza slowmode na podany czas",
  usage: "slowmode <>"
};
