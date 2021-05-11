const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Napisz coś!`)
        message.react('👍')
        message.react('👎')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["vłotebłan"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "voteban",
    category: "🎉 | 4fun",
    description: "Voteban",
    usage: "votaban"
};