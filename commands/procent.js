const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
if (!args[0]) return client.error(message, `Nie podano użytkownika`)
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]);
    let percent = Math.floor(Math.random() * (100 - 0) + 0)
    let promiles = Math.floor(Math.random() * (5 - 0) + 0)
    let embed = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setDescription(`${user.username} jest pijany w ${percent}%\n\nPromile: ${promiles}`)
    message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["alkohol"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "procent",
    category: "🎉 | 4fun",
    description: "oblicza promile",
    usage: "procent"
};