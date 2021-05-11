const Discord = require('discord.js-light')
module.exports = async (client, emoji) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(emoji.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsEmojiDelete FROM ServerSettings WHERE ID = ?`).get(emoji.guild.id).logsEmojiDelete==="true") {
      let tof = {
        true: "Tak",
        false: "Nie"
      }
      let moment = require('moment-timezone')
      moment.locale('pl')
      let embed = new Discord.MessageEmbed()
      .setTitle('Logi - Usunięto emoji!')
    .setColor('#ff0000')
    .addField('Nazwa', emoji.name)
    .addField('ID', emoji.id)
      .addField('Animowane?', tof[emoji.animated])
      .setImage(emoji.url)
      .addField('Stworzona', moment(emoji.createdTimestamp).tz('Europe/Warsaw').format('LLLL'))
      .setTimestamp()
        emoji.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(emoji.guild.id).logsChannel).send(embed)

  }
}  
}