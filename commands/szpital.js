const request = require("request");
const Discord = require("discord.js");
exports.run = (client, message, args, level) => {
let other = Math.floor(Math.random() * (100 - 0) + 0)
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;
    let embed = new Discord.MessageEmbed()
        .setTitle(`Pójście do szpitala`)
        .setDescription(`${user} poszedł do szpitala, po czym szpital wykazał u niego ${other} chorób!`)
        .setColor(`GREEN`)
    message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["szpitaltvn"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "szpital",
    category: "🎉 | 4fun",
    description: "Idziesz do szpitala.",
    usage: "szpital"
};
