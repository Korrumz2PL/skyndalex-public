const Discord = require("discord.js");
const request = require('request');
exports.run = async (client, message, args, level) => {
    
    // message.channel.send('haha tu tajna komenda')
    let url = `https://api.dblista.pl/v1/bots/${args[0]||client.user.id}`
    request(url, function (err, response, body) {
        let dblista = JSON.parse(body)
       // let bot = client.users.cache.get(args[0]||client.user.id)
        const moment = require("moment-timezone");
moment.locale('pl')
     /*   if(bot) {
            let status = {
                online: "Dostępny",
                idle: "Zaraz wracam",
                dnd: "Nie przeszkadzać",
                offline: "Niedostępny"
            }
            let botembed = new Discord.MessageEmbed('Botinfo')
            .setTitle(bot.tag)
            .setDescription(bot.id)
            .setThumbnail(bot.displayAvatarURL())
            .addField(status[bot.presence.status]||"?", moment(bot.createdTimestamp).tz('Europe/Warsaw').format('LLLL')|"?")
            message.channel.send(botembed)
        } else message.channel.send("Nie znaleziono bota w użytkownikach") */
        function Round(n, k) 
{
    var factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}
        let embed = new Discord.MessageEmbed()
        .setAuthor(dblista.data.name, dblista.data.avatarURL)
        .setThumbnail(dblista.data.avatarURL)
        .setTitle(`${dblista.data.name} - ${dblista.data.id}`)
        .setDescription(`Krótki opis: ${dblista.data.info.shortDescription}`)
        .addField('Biblioteka programowania', dblista.data.info.library)
        .addField('Prefix', dblista.data.info.prefix)
        .addField('Tagi', dblista.data.info.tags.join(', '))
        .addField('Linki', `Serwer discord: ${dblista.data.links.discordServer||"Brak"}\nRepozytorium: ${dblista.data.links.gitRepository||"Brak"}\nStrona internetowa: ${dblista.data.links.website||"Brak"}`)
        .addField('Właściciele', `Główny: ${dblista.data.ownerID}\nInni: ${dblista.data.owners.join(', ')||"Brak"}`)
        .addField('Statystyki', `Serwery: ${dblista.data.stats.servers}\nUżytkownicy: ${dblista.data.stats.members}\nGłosy: ${dblista.data.votes}`)
        .addField('Status', dblista.data.stats.status)
        .addField('Miesięcznych dodań', dblista.data.stats.monthlyInvites)
        .addField('Premium', dblista.data.status.premium)
        .addField('Booster', dblista.data.premium.booster)
        
        .addField('Uptime', `${dblista.data.uptime.online}/${dblista.data.uptime.max} (${Round(dblista.data.uptime.online/dblista.data.uptime.max*100, 2)}%)`)
//        .addField('Status weryfikacji', dblista.data.status.verification)
        message.channel.send(embed)
      //  message.channel.send(`ID: ${dblista.data.id}\nAvatar: ${dblista.data.avatarURL}\nBiblioteka: ${dblista.data.info.library}\nPrefix: ${dblista.data.info.prefix}\nTagi: ${dblista.data.info.tags.join(', ')}`)
    })
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Programista"
  };
  
  exports.help = {
    name: "test",
    category: "🔴 | Deweloperskie",
    description: "test",
    usage: "test"
  };
  