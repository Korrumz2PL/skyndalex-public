const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
let embed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`Obsługuje nowy system pomocy! Napisz \`\`help\`\` na wiadomości prywatnej bota!`)
    message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ticket"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "botticket",
    category: "🤖 | Systemowe",
    description: "wysyła ticket do administracji bota",
    usage: "botticket"
};