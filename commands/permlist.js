const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    let embedwiadomosc1 = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
        .setColor(`RED`)
        .setDescription(`Lista permisji występujących w bocie`)
        .addField(`Poziom permisji: 0`, `Użytkownik`)
        .addField(`Poziom permisji: 2`, `Moderator`)
        .addField(`Poziom permsji: 3`, `Administrator`)
        .addField(`Poziom permisji: 4`, `Właściciel serwera`)
        .addField(`Poziom permisji: 1`, `Tester`)
        .addField(`Poziom permisji: 6`, `Supporter`)
        .addField(`Poziom permisji: 9`, `Programista`)
        .addField(`Poziom permisji: 10`, `Główny programista`)
        .setFooter(`Chcesz zobaczyć swoje permisje? wpisz !!perms`)
    message.channel.send(embedwiadomosc1)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "permlista",
    category: "🇮 | Informacyjne",
    description: "Sprawdź wszystkie permisje występujące w bocie.",
    usage: "permlista"
};
