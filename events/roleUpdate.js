const Discord = require('discord.js-light')
module.exports = async (client, oldRole, newRole) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(newRole.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsRoleEdit FROM ServerSettings WHERE ID = ?`).get(newRole.guild.id).logsRoleEdit==="true") {
      if(newRole.members.size!=oldRole.members.size) return
      if(newRole.rawPosition!=oldRole.rawPosition) return
      let tof = {
          false: "Nie",
          true: "Tak"
        }
      let moment = require('moment-timezone')
    moment.locale('pl')
      let embed = new Discord.MessageEmbed()
      .setTitle('Logi - Edytowano rolę!')
    .setColor('#ff8800')
    .addField('Nazwa', newRole.name)
    .addField('ID', newRole.id)
      if(newRole.name!=oldRole.name) {
        embed.addField('Nazwa przed', oldRole.name)
        embed.addField('Nazwa po', newRole.name)
      }
      if(newRole.hexColor!=oldRole.hexColor) {
        embed.addField('Kolor hex przed', oldRole.hexColor)
        embed.addField('Kolor hex po', newRole.hexColor)
      }
      if(newRole.hoist!=oldRole.hoist) {
        embed.addField('Czy była wyświetlana osobno?', tof[oldRole.hoist])
        embed.addField('Czy jest wyświetlana osobno?', tof[newRole.hoist])
      }
      if(newRole.hoist!=oldRole.hoist) {
        embed.addField('Czy była do wzmiankowania?', tof[oldRole.mentionable])
        embed.addField('Czy jest do wzmiankowania?', tof[newRole.mentionable])
      }
      if(newRole.permissions!=oldRole.permissions) {
      embed.addField('Permisje przed', new Discord.Permissions(oldRole.permissions.bitfield).toArray().join(' | '))
      embed.addField('Permisje po', new Discord.Permissions(newRole.permissions.bitfield).toArray().join(' | '))
      }
      if(newRole.rawPosition!=oldRole.rawPosition) {
      embed.addField('Pozycja przed', oldRole.rawPosition)
        embed.addField('Pozycja po', newRole.rawPosition)
      }
      embed.addField('Stworzona', moment(newRole.createdTimestamp).tz('Europe/Warsaw').format('LLLL'))
        newRole.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(newRole.guild.id).logsChannel).send(embed)

  }
}  
}