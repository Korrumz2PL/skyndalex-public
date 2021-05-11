const Discord = require('discord.js-light')
module.exports = async (client, emoji) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(emoji.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsEmojiCreate FROM ServerSettings WHERE ID = ?`).get(emoji.guild.id).logsEmojiCreate==="true") {
      let tof = {
        true: "Tak",
        false: "Nie"
      }
      let embed = new Discord.MessageEmbed()
      .setTitle('Logi - Utworzono emoji!')
    .setColor('#00ff11')
    .addField('Nazwa', emoji.name)
    .addField('ID', emoji.id)
      .addField('Animowane?', tof[emoji.animated])
      .setImage(emoji.url)
      .setTimestamp()
        emoji.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(emoji.guild.id).logsChannel).send(embed)

  }
}  
}