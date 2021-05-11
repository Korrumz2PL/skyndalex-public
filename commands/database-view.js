const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    let data = client.dbs.prepare('SELECT * FROM ServerSettings').get()
message.channel.send(data).catch(err => {
    client.error(message, err)
})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Programista"
};

exports.help = {
    name: "database-view",
    category: "🔴 | Deweloperskie",
    description: "Wyświetla dane w bazie danych.",
    usage: "database-view [tabela]"
};

