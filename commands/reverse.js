const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    if(!args[0]) return client.error(message, `Napisz tekst do przerobienia!`)
    let odwrocono = new Discord.MessageEmbed()
        .setTitle(`Odwrócono tekst!`)
        .setDescription(`Tekst przed odwróceniem: \`\`${args.join(' ')}\`\`\nTekst po odwróceniu: \`\`${args.join(' ').split('').reverse().join('')}\`\``)
        .setColor(`GREEN`)
    message.channel.send(odwrocono)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["odwróć"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "reverse",
    category: "🎉 | 4fun",
    description: "Odwraca tekst",
    usage: "reverse <tekst>"
};
