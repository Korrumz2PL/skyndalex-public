const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
 let nitros = ["https://discord.gift/8SkdCZfz7VaPB7va", "https://discord.gift/qnsfEfKqFzdqlgOx", "https://discord.gift/DkDaQei03vGrUDvh"]
    let embed1 = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`Nitro`)
        .addField(`Zdobyto nowy gift nitro!`, nitros.random())
        .setFooter(`Fake!`)
        .setImage(`https://support.discord.com/hc/article_attachments/360013500032/nitro_gif.gif`)
    message.channel.send(embed1)
 }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["najtro"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "nitro",
    category: "🎉 | 4fun",
    description: "Generuje losowy gift nitro [FAKE]",
    usage: "nitro"
};