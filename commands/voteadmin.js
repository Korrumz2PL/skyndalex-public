const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Napisz coś!`)
    message.react('👍')
    message.react('👎')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["vłoteładmin"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "voteadmin",
    category: "🎉 | 4fun",
    description: "Voteadmin",
    usage: "voteadmin"
};