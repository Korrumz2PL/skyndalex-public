const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]);
    const channel = message.guild.channels.cache.get(client.dbs.prepare("SELECT commentChannel FROM ServerSettings WHERE ID = ?").get(message.guild.id).commentChannel)
    if(!channel) return client.error(message, 'Nie znaleziono kanału')
    if(!args[0]) return client.error(message, `Poprawne użycie:\nprefixzakomentuj treśćkomentarza`)
        channel.send(`Komentarz\n• ${message.author.tag}\n• ${args.join('')}`)
        message.channel.send(`Wysłano!`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["zakomentujpropozycje"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "zakomentuj",
    category: "🛠️ | Narzędzia",
    description: "Komentuje propozycję użytkownika",
    usage: "zakomentuj <tresc>"
};





