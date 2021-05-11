const moment = require("moment-timezone");
moment.locale('pl')
const Discord = require('discord.js');
module.exports.run = async (client, message, args, data) => {
    if (!args[0]) return client.error(message, `Podaj nazwę emotki!`)
    const emoji = client.emojis.cache.get(`${args}`) || client.emojis.cache.find(emoji => emoji.name === `${args}`);
    let created = moment(emoji.createdAt).tz('Europe/Warsaw').format('LLLL')
    let animated = {
        false: "Nie jest animowana",
        true: "Jest animowana"
    }
    let embed = new Discord.MessageEmbed()
        .setTitle(`Informacje o emotce ${emoji.name}`)
        .addField(`Czy jest animowana?`, `${animated[emoji.animated]}`)
        .addField(`Data stworzenia`, `${created}`)
        .setThumbnail(`${emoji.url}`)
        .addField(`URL do tej emotki:`, `[Klik!](${emoji.url})`)
        .addField(`ID emotki:`, `${emoji.id}`)
        .setColor(`GREEN`)
    message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ei"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "einfo",
    category: "🎉 | 4fun",
    description: "Informacje o emoji",
    usage: "emoji <emotka>"
};