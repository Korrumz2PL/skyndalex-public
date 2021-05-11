const Discord = require('discord.js-light')
module.exports = async (client, oldEmoji, newEmoji) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(newEmoji.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsEmojiUpdate FROM ServerSettings WHERE ID = ?`).get(newEmoji.guild.id).logsEmojiUpdate==="true") {
      let tof = {
        true: "Tak",
        false: "Nie"
      }
      let embed = new Discord.MessageEmbed()
      .setTitle('Logi - Edytowano emoji!')
    .setColor(' #ff8800')
    .addField('Nazwa', newEmoji.name)
    .addField('ID', newEmoji.id)
      if(newEmoji.name!=oldEmoji.name) {
        embed.addField('Stara nazwa', oldEmoji.name)
        .addField('Nowa nazwa', newEmoji.name)
      }
      embed.setImage(newEmoji.url)
      embed.setTimestamp()
        newEmoji.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(newEmoji.guild.id).logsChannel).send(embed)

  }
}  
}