const Discord = require("discord.js");
exports.run = async (client, message, args) => {
if (!args[0]) return client.error(message, `Nie podano argumentów.\n\`\`embed-create [tytuł] [opis] [kolor] [author] [footer]\`\``)
    let embedTitle = args[0]
    let embedDesc = args[1]
    let embedColor = args[2]
    let embedAuthor = args[3]
    let embedFooter = args[4]
    if (!embedDesc) return client.error(message, `Nie podano odpowiednich argumentów!`)
    if (!embedColor) return client.error(message, `Nie podano odpowiednich argumentów!`)
    if (!embedAuthor) return client.error(message, `Nie podano odpowiednich argumentów!`)
    if (!embedFooter) return client.error(message, `Nie podano odpowiednich argumentów!`)
    let embedCreated = new Discord.MessageEmbed()
        .setAuthor(embedAuthor)
        .setTitle(embedTitle)
        .setDescription(embedDesc)
        .setColor(embedColor)
        .setFooter(embedFooter)
    message.channel.send(embedCreated)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["embedkreator"],
    permLevel: "Tester"
};

exports.help = {
    name: "embed-create",
    category: "🎉 | 4fun",
    description: "Tworzy embed",
    usage: "embed-create"
};
