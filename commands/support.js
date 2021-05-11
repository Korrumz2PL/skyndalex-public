const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
    message.channel.send(`Trwa wysyłanie linku!`)
    let embed = new Discord.MessageEmbed()
         .setTitle(`Support`)
         .setDescription(`Cześć! Zauważyłem, że używasz komendy \`\`support\`\`. Link do supportu znajdziesz poniżej.`)
         .addField(`Link`, `https://discord.gg/Gz2NgHf`)
         .setColor(`GREEN`)
    message.author.send(embed).catch(err => {
        message.channel.send(`Nie mogłem wysłać do ciebie linku! Najprawdopoboniej masz zablokowane wiadomości prywatne.\n\`\`\`${err}\`\`\``)
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "support",
    category: "🇮 | Informacyjne",
    description: "Dołącza cię na serwer support",
    usage: "support"
};
