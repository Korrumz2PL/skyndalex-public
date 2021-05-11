const Discord = require('discord.js-light')
module.exports = async (client, guild, user) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsUserBan FROM ServerSettings WHERE ID = ?`).get(guild.id).logsUserBan==="true") {
      let tof = {
        true: "Tak",
        false: "Nie"
      }
      let embed = new Discord.MessageEmbed()
      .setTitle('Logi - Zbanowano użytkownika!')
    .setColor('#ff0000')
    .addField('Nazwa użytkownika+tag', user.tag)
    .addField('ID', user.id)    
      embed.setTimestamp()
        guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(guild.id).logsChannel).send(embed)

  }
}  
}