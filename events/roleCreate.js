const Discord = require('discord.js-light')
module.exports = async (client, role) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(role.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsRoleCreate FROM ServerSettings WHERE ID = ?`).get(role.guild.id).logsRoleCreate==="true") {
      let embed = new Discord.MessageEmbed()
      .setTitle('Logi - Utworzono rolę!')
    .setColor('#00ff11')
    .addField('Nazwa', role.name)
    .addField('ID', role.id)
      .setTimestamp()
        role.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(role.guild.id).logsChannel).send(embed)

  }
}  
}