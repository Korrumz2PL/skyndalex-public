const Discord = require('discord.js-light')
module.exports = async (client, channel) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(channel.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsChannelCreate FROM ServerSettings WHERE ID = ?`).get(channel.guild.id).logsChannelCreate==="true") {
      
    let tof = {
          false: "Nie",
          true: "Tak"
        }
    let moment = require('moment-timezone')
    moment.locale('pl')
    if(channel.type==="category") {
    let embed = new Discord.MessageEmbed()
    .setTitle('Logi - Utworzono kategorię!')
    .setColor('#00ff11')
    .addField('Nazwa', channel.name)
    .addField('ID', channel.id)
    .addField('Pozycja', channel.rawPosition)
    channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(channel.guild.id).logsChannel).send(embed)
    } else {
      let typ = {
        text: "Kanał tekstowy",
        voice: "Kanał głosowy",
        news: "Kanał ogłoszeniowy",
        store: "Sklep",
        unknown: "Nieznany typ"
      }
      let embed = new Discord.MessageEmbed()
    .setTitle('Logi - Utworzono kanał!')
    .setColor('#00ff11')
    .addField('Nazwa', channel.name)
    .addField('ID', channel.id)
    .addField('Pozycja', channel.rawPosition)
    .addField('Typ', typ[channel.type])
    channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(channel.guild.id).logsChannel).send(embed)

    }
  
}
  }
}  