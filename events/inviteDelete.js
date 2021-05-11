
const Discord = require('discord.js-light')
module.exports = async (client, invite) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(invite.channel.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsInviteDelete FROM ServerSettings WHERE ID = ?`).get(invite.channel.guild.id).logsInviteDelete==="true") {
      let tof = {
        true: "Tak",
        false: "Nie"
      }
      let embed = new Discord.MessageEmbed()
      .setTitle('Logi - Usunięto zaproszenie!')
    .setColor('#ff0000')
    .addField('Kanał zaproszenia', invite.channel)
    .addField('Link', invite.url)    
      embed.setTimestamp()
        invite.channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(invite.channel.guild.id).logsChannel).send(embed)

  }
}  
}