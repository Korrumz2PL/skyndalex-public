const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
    message.member.voice.channel.join()
    let embed1 = new Discord.MessageEmbed()
        .setTitle(`Powodzenie`)
        .setColor(`GREEN`)
        .setDescription(`Dołączyłem na kanał!`)
    message.channel.send(embed1)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["wejdz"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "join",
    category: "muzyka",
    description: "Bot wchodzi na kanał głosowy",
    usage: "join"
};




