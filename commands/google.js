const Discord = require("discord.js");
const Canvas = require(`canvas`)
exports.run = async (client, message, args) => {
if (!args[0]) return client.error(message, `Napisz frazę do wyszukania!`)
    let embed = new Discord.MessageEmbed()
        .setTitle(`Wyniki wyszukiwania`)
        .setDescription(`-> https://www.google.com/search?client=firefox-b-d&q=${args.join(' ')}`)
        .setColor(`GREEN`)
    message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["google"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "google",
    category: "🎉 | 4fun",
    description: "Wyszukiwarka google",
    usage: "google"
};
