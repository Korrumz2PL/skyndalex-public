const Discord = require('discord.js-light')
module.exports = async (client, oldMessage, newMessage) => {
  if (newMessage.author.id === client.user.id) return
  if(newMessage.author.bot) return
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(newMessage.channel.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsEditMessage FROM ServerSettings WHERE ID = ?`).get(newMessage.channel.guild.id).logsEditMessage==="true") {
      if(oldMessage.content===newMessage.content&&newMessage.attachments.map(a=>a.url)[0]===oldMessage.attachments.map(a=>a.url)[0]) return
      let embed = new Discord.MessageEmbed()
      .setColor('#ff8800')
      .setTitle('Logi - Edytowano Wiadomość')
      .setDescription(`Autor: ${newMessage.author.tag} (${newMessage.author.id})\nID wiadomości: ${newMessage.id}\nKanał gdzie jest wiadomość: ${newMessage.channel}`)
      if(oldMessage.content!=newMessage.content) {
        if(oldMessage.content) embed.addField('Przed edycją', oldMessage.content)
      if(!oldMessage.content) embed.addField('Błąd', 'Przed edycją wiadomość nie miała treści')
      if(newMessage.content) embed.addField('Po edycji', newMessage.content)
      if(!newMessage.content) embed.addField('Błąd', 'Po edycji wiadomość nie ma treści')
      }
      if(oldMessage.attachments.map(a=>a.name)[0]!=newMessage.attachments.map(a=>a.name)[0]) {
      if(oldMessage.attachments.map(a=>a.url)[0]) embed.addField('Pliki przed edycją', oldMessage.attachments.map(a=>`${a.name} -> ${a.url}`));
    if(!oldMessage.attachments.map(a=>a.url)[0]) embed.addField('Pliki przed edycją', 'Wiadomość nie zawierała żadnych plików');
      if(newMessage.attachments.map(a=>a.url)[0]) embed.addField('Pliki po edycji', newMessage.attachments.map(a=>`${a.name} -> ${a.url}`));
    if(!newMessage.attachments.map(a=>a.url)[0]) embed.addField('Pliki po edycji', 'Wiadomość nie zawiera żadnych plików');
      }
   //   if(oldMessage.embeds[0]) embed.addField('Wiadomość przed edycją zawierała embed?', `Tak\nEmbed przed edycją zostanie wysłany jako pierwszy`)
  //  if(!oldMessage.embeds[0]) embed.addField('Wiadomość przed edycją zawierała embed?', 'Nie')
  //    if(newMessage.embeds[0]) embed.addField('Wiadomość po edycji zawiera embed?', `Tak\nEmbed po edycji zostanie wysłany po tym przed edycją (o ile owy był)`)
  //  if(!newMessage.embeds[0]) embed.addField('Wiadomość po edycji zawierała embed?', 'Nie')
    newMessage.channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(newMessage.channel.guild.id).logsChannel).send(embed)
   
  /*    if(oldMessage.embeds[0]) {
    let e = ""
    for(e of oldMessage.embeds) {
      newMessage.channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(newMessage.channel.guild.id).logsChannel).send(e)
    }
  }
  if(newMessage.embeds[0]) {
    let e = ""
    for(e of newMessage.embeds) {
      newMessage.channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(newMessage.channel.guild.id).logsChannel).send(e)
    }
  } */
      
    }
  
}
  }