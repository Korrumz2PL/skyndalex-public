const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
    if (!args[0]) return client.error(message, `Napisz opinię!`)
let channel = client.channels.cache.get('769912385393655818')
    let embed = new Discord.MessageEmbed()
        .setTitle(`Wysłano opinię do administracji bota`)
        .addField(`Treść:`, `${args.join(' ')}`)
        .setColor(`GREEN`)
    message.channel.send(embed)
    let suggestionembed = new Discord.MessageEmbed()
        .setTitle(`Nowa opinia`)
        .addField(`Przesłał`, `${message.author.tag}(ID: ${message.author.id})`)
        .setDescription(`Treść:\n${args.join(' ')}`)
        .setColor(`GREEN`)
    channel.send(suggestionembed).then(m => {
        m.react('👍')
        m.react('👎')
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["opiniabot"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "opinia",
    category: "🇮 | Informacyjne",
    description: "Wysyła opinie bota do właścicieli bota.",
    usage: "opinia"
};
