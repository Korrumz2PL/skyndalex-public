const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
let user = message.mentions.users.first() || client.users.cache.get(args[0])
    if (!args[0]) return client.error(message, `Nie podano użytkownika!`)
    let embed = new Discord.MessageEmbed()
        .setTitle(`Zabito`)
        .setDescription(`${message.author.tag} zabił ${user.tag}`)
        .setColor(`GREEN`)
        message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kill"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "zabij",
    category: "🎉 | 4fun",
    description: "zabija",
    usage: "zabij"
};