const Discord = require('discord.js-light')
module.exports = async (client, channel) => {
  const moment = require('moment-timezone')
  moment.locale('pl')
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(channel.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsChannelDelete FROM ServerSettings WHERE ID = ?`).get(channel.guild.id).logsChannelDelete==="true") {
      
    let tof = {
          false: "Nie",
          true: "Tak"
        }
    let moment = require('moment-timezone')
    moment.locale('pl')
    if(channel.type==="category") {
    let embed = new Discord.MessageEmbed()
    .setTitle('Logi - Usunięto kategorię!')
    .setColor('#ff0000')
    .addField('Nazwa', channel.name)
    .addField('ID', channel.id)
    .addField('Pozycja', channel.rawPosition)
    .addField('Stworzona', moment(channel.createdTimestamp).tz('Europe/Warsaw').format('LLLL'))
    channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(channel.guild.id).logsChannel).send(embed)
    } else {
      let tof = {
          false: "Nie",
          true: "Tak"
        }
      let typ = {
        text: "Kanał tekstowy",
        voice: "Kanał głosowy",
        news: "Kanał ogłoszeniowy",
        store: "Sklep",
        unknown: "Nieznany typ"
      }
      let embed = new Discord.MessageEmbed()
    .setTitle('Logi - Usunięto kanał!')
    .setColor('#ff0000')
    .addField('Nazwa', channel.name)
    .addField('ID', channel.id)
    .addField('Pozycja', channel.rawPosition)
    .addField('Typ', typ[channel.type])
if(channel.topic&&channel.type!="voice")    embed.addField('Temat', channel.topic)
if(!channel.topic&&channel.type!="voice") embed.addField('Błąd', 'Brak tematu')
if(channel.type!="voice")      embed.addField('NSFW', tof[channel.nsfw])
      if(channel.type==="voice") embed.addField('Bitrate', channel.bitrate)
      if(channel.type==="voice"&&channel.userLimit>=1) embed.addField('Limit użytkowników', channel.userLimit)
      if(channel.type==="voice"&&channel.userLimit==0) embed.addField('Limit użytkowników', 'Brak')
      embed.addField('Stworzony', moment(channel.createdTimestamp).tz('Europe/Warsaw').format('LLLL'))
    channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(channel.guild.id).logsChannel).send(embed)

    }
  
}
  }
}  