const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
let infoPremium = new Discord.MessageEmbed()
    .setTitle(`Skyndalex premium (SPOILERY - PREMIUM NIESKOŃCZONE.)`)
    .setDescription(`Witaj! Chciałbyś wesprzeć twórców bota? Zachęcamy do kupna premium! Koszt jest niewielki, a nam dużo da!\nW tej wiadomości opowiem ci wszystko po kolei`)
    .addField(`Płatności`, `Istnieją 2 rodzaje premium. *premium classic* oraz *premium ultra*. Cena nie została ustalona.`)
    .addField(`Korzyści`, `Jeszcze nie ustalono korzyści! Przepowiadamy komendy dla premium, oraz udogodnienia w (przyszłym) panelu!`)
    .addField(`Jak mogę dostać?`, `Nie da się tego w tym czasie dostać. Ale w przyszłości będzie możliwość pod tym linkiem: https://tipanddonation.com/Skyndalex.`)
    .setColor(`GREEN`)
    message.channel.send(infoPremium)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "premium",
    category: "🇮 | Informacyjne",
    description: "Zobacz, czym jest Skyndalex PREMIUM!",
    usage: "premium"
};