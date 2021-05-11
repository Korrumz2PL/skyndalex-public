const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
let user = client.users.cache.get(args[0]) || message.users.mentions.first()
    if (!user) return client.error(message, `Nie znaleziono użytkownika`)
    if (!args[0]) return client.error(message, `Nie podano użytkownika któremu chcesz nadać reputację!`)
    let repSize = args[1]
    let repReason = args.join(' ').split(2)
    if (!repSize) return client.error(message, `Nie podano ilości reputacji`)
    if (!repReason) return client.error(message, `Nie podano powodu reputacji`)
    if (isNaN(args[0])) return client.error(message, `To, co wpisałeś nie jest liczbą!`)
    let embed = new Discord.MessageEmbed()
        .setTitle(`Przekazano reputację`)
        .addField(`Użytkownik`, `${user.tag}`, true)
        .addField(`Kto przesłał reputację?`, `${message.author.tag}`, true)
        .addField(`Ilość reputacji`, `${repSize}`, true)
        .addField(`Powód przyznania reputacji`, `${repReason}`, true)
        .setColor(`GREEN`)
    message.channel.send(embed).catch(err => {
        message.channel.send(`\`\`\`${err}\`\`\``)
    })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["reputacja"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "rep",
    category: "🎉 | 4fun",
    description: "nadaję reputacje użytkownikowi",
    usage: "rep"
};