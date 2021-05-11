const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    if (!args[0]) return client.error(message, `Podaj argumenty!`)
    let argsRandom = [`${args[0]}`, `${args[1]}`]
    let embed = new Discord.MessageEmbed()
        .setTitle(`Wybrano!`)
        .addField(`Wybrałem`, argsRandom.random())
        .setColor(`GREEN`)
    message.channel.send(embed).catch(err => {
        message.channel.send(err)
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["choose"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "choose",
    category: "🛠️ | Narzędzia",
    description: "Wybieranie.",
    usage: "wybierz"
};

