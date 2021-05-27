const Discord = require('discord.js-light')
const dayjs = require('dayjs')
dayjs().locale('pl').format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A')
exports.run = async (client, message, args) => {
let embed = new Discord.MessageEmbed()
    .setTitle(`Informacje o serwerze`)
    .addField(`Właściciel`, `<@${message.guild.ownerID}>`)
    .addField(`ID`, `${message.guild.id}`)
    .addField(`Role`, `Soon:tm:`)
    .addField(`Data stworzenia`, `Soon:tm:`)
    .addField(`Liczba użytkowników`, `${message.guild.members.size}`)
    .setColor(`GREEN`)
    message.channel.send(embed)
};

exports.help = {
    name: "se",
    description: "Serverinfo",
    category: "tools",
}