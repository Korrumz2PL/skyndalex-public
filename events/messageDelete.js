const Discord = require('discord.js-light')
module.exports = async (client, message) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(message.channel.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsDeleteMessage FROM ServerSettings WHERE ID = ?`).get(message.channel.guild.id).logsDeleteMessage==="true") {
      
    let tof = {
          false: "Nie",
          true: "Tak"
        }
    let moment = require('moment-timezone')
    moment.locale('pl')
    let embed = new Discord.MessageEmbed()
    .setTitle('Logi - Usunięto wiadomość!')
    .setColor('#ff0000')
    .setDescription(`Autor: ${message.author.tag} (${message.author.id})\nID wiadomości: ${message.id}\nKanał gdzie była wiadomość: ${message.channel}`)
if(message.content)    embed.addField('Treść', message.content);
if(!message.content) embed.addField('Błąd', 'Wiadomość nie ma treści')
if(message.embeds[0]) embed.addField('Wiadomość zawiera embed?', 'Tak')
      if(message.embeds[0]) embed.setFooter('Embed został wysłany poniżej')
    if(!message.embeds[0]) embed.addField('Wiadomość zawierała embed?', 'Nie')
    embed.addField('Wiadomość była tts?', tof[message.tts])
   if(message.attachments.map(a=>a.url)[0]) embed.addField('Pliki', message.attachments.map(a=>`${a.name} -> ${a.url}`));
    if(!message.attachments.map(a=>a.url)[0]) embed.addField('Pliki', 'Wiadomość nie zawierała żadnych plików');
    embed.addField('Była przypięta?', tof[message.pinned])
    .addField('Wysłana', moment(message.createdTimestamp).tz('Europe/Warsaw').format('LLLL'))
  message.channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(message.channel.guild.id).logsChannel).send(embed)
  if(message.embeds[0]) {
    let e = ""
    for(e of message.embeds) {
      message.channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(message.channel.guild.id).logsChannel).send(e)
    }
  }
}
  }
}  