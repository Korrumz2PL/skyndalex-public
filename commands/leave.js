const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
    message.member.voice.channel.leave()
    let embed1 = new Discord.MessageEmbed()
        .setColor(`RED`)
        .setDescription(`Wyszłem z kanału!`)
    message.channel.send(embed1)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["wyjdz"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "leave",
    category: "muzyka",
    description: "Bot wychodzi z kanału głosowego",
    usage: "leave"
};




