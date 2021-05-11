const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
let user = client.users.cache.get(args[0])
    if (!args[0]) return client.error(message, `Podaj id!`)
    if (!user) return client.error(message, `Nie znaleziono użytkownika`)
    let embed = new Discord.MessageEmbed()
        .setTitle(`Sprawdzono!`)
        .addField(`To był`, `${user.tag}`)
        .setColor(`GREEN`)
    message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "id",
    category: "🎉 | 4fun",
    description: "sprawdź username za pomocą id",
    usage: "id"
};