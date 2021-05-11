const request = require("request");
const Discord = require("discord.js");
exports.run = (client, message, args, level) => {
    if (!args[0]) return client.error(message, `Podaj argument!`)
    message.react('👍')
    message.react('👎')
message.channel.send(`Poddano głosowanie. Spójrz na swoje reakcje!`).then(m => {
    m.delete({timeout: 3000})
})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["degradvote"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "votedegrad",
    category: "🎉 | 4fun",
    description: "Głosuje degrad",
    usage: "votedegrad"
};
