exports.run = async (client, message, args, level) => {
    const Discord = require('discord.js');
    /*
    const moment = require("moment");
    require("moment-duration-format");
    const request = require('request');
    let os = require('os')
    let cpuStat = require("cpu-stat")

     */
    let discordJsLight = require('discord.js-light').version
    let ramUsedPercentage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    let statsEmbed = new Discord.MessageEmbed()
        .setTitle(`Statystyki`)
        .setDescription(`Witaj w statystykach! W tej komendzie możesz zobaczyć ważne rzeczy.`)
        .addField(`Liczba serwerów`, `${client.guilds.cache.size}`)
        .addField(`Liczba użytkowników`, `${client.users.cache.size}`)
        .addField(`Wersja discord.js`, `${discordJsLight}`)
        .addField(`Wersja node.js`, `${process.version}`)
        .addField(`Uptime`, `Soon:tm:`)
        .addField(`Użycie pamięci RAM`, `${ramUsedPercentage}`)
        .setColor(`GREEN`)
    message.channel.send(statsEmbed)
};




exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["staty"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "statystyki",
    category: "🤖 | Systemowe",
    description: "Pokazuje statystyki bota",
    usage: "statystyki"
};
