const Discord = require('discord.js-light')
module.exports = async (client, role) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(role.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsRoleDelete FROM ServerSettings WHERE ID = ?`).get(role.guild.id).logsRoleDelete==="true") {
      let tof = {
          false: "Nie",
          true: "Tak"
        }
      let moment = require('moment-timezone')
    moment.locale('pl')
      let embed = new Discord.MessageEmbed()
      .setTitle('Logi - Usunięto rolę!')
    .setColor('#ff0000')
    .addField('Nazwa', role.name)
    .addField('ID', role.id)
      .addField('Kolor hex', role.hexColor)
      .addField('Czy była wyświetlana osobno?', tof[role.hoist])
      .addField('Ile osób miało tą rolę', role.members.size)
      .addField('Do wzmiankowania?', tof[role.mentionable])
      .addField('Permisje', 'Soon™')
      .addField('Pozycja', role.rawPosition)
      .addField('Stworzona', moment(role.createdTimestamp).tz('Europe/Warsaw').format('LLLL'))
        role.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(role.guild.id).logsChannel).send(embed)

  }
}  
}