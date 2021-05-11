const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;
    const Embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
        .setColor("#ffae00")
        .setTitle(`Licznik IQ`)
        .addField(`IQ użytkownika ${user.username}`, `${Math.floor(Math.random() * (1000 - 0) + 0)}`)
        .setFooter(`Maksymalną liczbą IQ jest 1000 :D`)
    message.channel.send(Embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ajkju"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "iq",
    category: "🎉 | 4fun",
    description: "Oblicza poziom IQ osoby.",
    usage: "iq"
};