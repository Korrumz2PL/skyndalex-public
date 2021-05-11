const Discord = require('discord.js-light')
module.exports = async (client, oldChannel, newChannel) => {
  const moment = require('moment-timezone')
  moment.locale('pl')
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(oldChannel.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsChannelEdit FROM ServerSettings WHERE ID = ?`).get(oldChannel.guild.id).logsChannelEdit==="true") {
      if(oldChannel.rawPosition!=newChannel.rawPosition) return
      if(oldChannel.lastPinTimestamp!=newChannel.lastPinTimestamp) return
    let tof = {
          false: "Nie",
          true: "Tak"
        }
    let moment = require('moment-timezone')
    moment.locale('pl')
    if(oldChannel.type==="category") {
    let embed = new Discord.MessageEmbed()
    .setTitle('Logi - Edytowano kategorię!')
    .setDescription(`Nazwa kategorii: ${newChannel.name}`)
    .setColor('#ff8800')
    if(oldChannel.name!=newChannel.name) {
    embed.addField('Nazwa przed', oldChannel.name)
    .addField('Nazwa po', newChannel.name)
    }
    embed.addField('ID', oldChannel.id)
/*      if(oldChannel.rawPosition!=newChannel.rawPosition) {
    embed.addField('Pozycja przed', oldChannel.rawPosition)
    .addField('Pozycja po', newChannel.rawPosition)
      } */
    embed.addField('Stworzona', moment(oldChannel.createdTimestamp).tz('Europe/Warsaw').format('LLLL'))
    oldChannel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(oldChannel.guild.id).logsChannel).send(embed)
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
    .setTitle('Logi - Edytowano kanał!')
      .setDescription(`Nazwa kanału: ${newChannel.name}`)
    .setColor('#ff8800')
      if(oldChannel.name!=newChannel.name) {
    embed.addField('Nazwa przed', oldChannel.name)
      .addField('Nazwa po', newChannel.name)
      }
    embed.addField('ID', oldChannel.id)
    /*  if(oldChannel.rawPosition!=newChannel.rawPosition) {
    embed.addField('Pozycja przed', oldChannel.rawPosition)
      .addField('Pozycja po', newChannel.rawPosition)
      } */
      if(oldChannel.type!=newChannel.type) {
    embed.addField('Typ przed', typ[oldChannel.type])
      .addField('Typ po', typ[newChannel.type])
      }
      if(oldChannel.topic!=newChannel.topic) {
if(oldChannel.topic&&oldChannel.type!="voice")    embed.addField('Temat przed', oldChannel.topic)
if(!oldChannel.topic&&oldChannel.type!="voice") embed.addField('Błąd', 'Brak tematu przed edycją')
      if(newChannel.topic&&newChannel.type!="voice")    embed.addField('Temat po', newChannel.topic)
if(!newChannel.topic&&newChannel.type!="voice") embed.addField('Błąd', 'Brak tematu po edycji')
      }
      if(oldChannel.rateLimitPerUser!=newChannel.rateLimitPerUser) {
      if(oldChannel.rateLimitPerUser>=1) embed.addField('Slowmode przed (w sekundach)', oldChannel.rateLimitPerUser)
      if(oldChannel.rateLimitPerUser==0) embed.addField('Slowmode przed', 'Brak')
      if(newChannel.rateLimitPerUser>=1) embed.addField('Slowmode po (w sekundach)', newChannel.rateLimitPerUser)
      if(newChannel.rateLimitPerUser==0) embed.addField('Slowmode po', 'Brak')
      }
      if(oldChannel.nsfw!=newChannel.nsfw) {
if(oldChannel.type!="voice")      embed.addField('NSFW przed', tof[oldChannel.nsfw])
      if(newChannel.type!="voice")      embed.addField('NSFW po', tof[newChannel.nsfw])
      }
      if(oldChannel.parentID!=newChannel.parentID) {
        embed.addField('Kategoria w jakiej znajdował się kanał', `\``+newChannel.guild.channels.get(oldChannel.parentID).name||"BRAK")
        embed.addField('Kategoria w jakiej znajdował się kanał', `\``+newChannel.guild.channels.get(newChannel.parentID).name+`\``||"BRAK")
      }
      if(oldChannel.permissionOverwrites.map(e => e.allow.join())!=newChannel.permissionOverwrites.map(e => e.allow.join())) {
          /* let hastebin = require('hastebin.js');
let haste = new hastebin({url: 'https://hastebin.com'});
          haste.post(oldChannel.permissionOverwrites.map(e => e.id+':'+e.allow.toArray().join(' | ')+`\n`)).then(link => {
          embed.addField('Permisje (zezwolone) przed (id: permy)', link)
          })
        
let haste_two = new hastebin({url: 'https://hastebin.com'});
          haste_two.post(newChannel.permissionOverwrites.map(e => e.id+':'+e.allow.toArray().join(' | ')+`\n`)).then(link => {
          embed.addField('Permisje (zezwolone) po (id: permy)', link)
          }) */
        embed.addField('Permisje zostały zmienione', 'ze względu na problemy z hastebinem nie ma informacji jakie permisje zmienono')
      }
      if(oldChannel.bitrate!=newChannel.bitrate) {
      if(oldChannel.type==="voice") embed.addField('Bitrate przed', oldChannel.bitrate)
      if(newChannel.type==="voice") embed.addField('Bitrate po', newChannel.bitrate)
      }
      if(oldChannel.userLimit!=newChannel.userLimit) {
      if(oldChannel.type==="voice"&&oldChannel.userLimit>=1) embed.addField('Limit użytkowników przed', oldChannel.userLimit)
      if(oldChannel.type==="voice"&&oldChannel.userLimit==0) embed.addField('Limit użytkowników przed', 'Brak')
      if(newChannel.type==="voice"&&newChannel.userLimit>=1) embed.addField('Limit użytkowników po', newChannel.userLimit)
      if(newChannel.type==="voice"&&newChannel.userLimit==0) embed.addField('Limit użytkowników po', 'Brak')
      }
      embed.addField('Stworzony', moment(oldChannel.createdTimestamp).tz('Europe/Warsaw').format('LLLL'))
    oldChannel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(oldChannel.guild.id).logsChannel).send(embed)

    }
  
}
  }
}  