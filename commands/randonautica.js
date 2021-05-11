const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    /*
    Znaczek
    °
    "
     */
    let ran1 = Math.floor(Math.random() * (52 - 0) + 0)
    let ran2 = Math.floor(Math.random() * (13 - 0) + 0)
    let ran3 = Math.floor(Math.random() * (58 - 0) + 0)
    let ran4 = Math.floor(Math.random() * (20 - 0) + 0)
    let ran5 = Math.floor(Math.random() * (46 - 0) + 0)
    let ran6 = Math.floor(Math.random() * (51 - 0) + 0)
    let embed = new Discord.MessageEmbed()
        .setTitle(`Wylosowanio`)
        .addField(`Twoje kordynaty:`, `${ran1}°${ran2}'${ran3}.9"N ${ran4}°${ran5}'${ran6}.6"E`)
        .setColor(`GREEN`)
    message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kordynaty"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "randonautica",
    category: "🎉 | 4fun",
    description: "Generuje losowe kordynaty (OSTROŻNIE!)",
    usage: "randonautica"
};