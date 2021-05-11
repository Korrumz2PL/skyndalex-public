const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!args[0]) {
        client.error(message, `Poprawne użycie: przyjmijpropozycje [autor propozycji] [Nagroda (opcjonalnie)]`)
    } else {
        const Embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setColor("#1b7d1d")
            .setTitle(`Przyjęto propozycję!`)
            .addField(`Autor propozycji:`, `${user.username}`)
            .addField(`Przyjął propozycję`, `${message.author.username}`)
            .addField(`Przyznana nagroda:`, args.slice(1).join(" ") || 'Nie przyznano nagrody')
        message.channel.send(Embed);
        message.delete()
    }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["przyjmijpropozycje"],
    permLevel: "Moderator"
};

exports.help = {
    name: "przyjmijpropozycje",
    category: "🛠️ | Narzędzia",
    description: "Przyjmuje propozycję.",
    usage: "przyjmijpropozycję"
};
