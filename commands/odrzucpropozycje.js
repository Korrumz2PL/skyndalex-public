const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!args[0]) {
        client.error(message, `Poprawne użycie: odrzucpropozycje [autor propozycji]`)
    } else {
        const Embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setColor("RED")
            .setTitle(`Odrzucono propozycję!`)
            .addField(`Autor propozycji odrzuconej:`, `${user.username}`)
            .addField(`Odrzucił propozycję`, `${message.author.username}`)
        message.channel.send(Embed);
        message.delete()
    }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["odrzucpropozycje"],
    permLevel: "Moderator"
};

exports.help = {
    name: "odrzucpropozycje",
    category: "🛠️ | Narzędzia",
    description: "Odrzuca propozycje",
    usage: "odrzucpropozycje"
};
