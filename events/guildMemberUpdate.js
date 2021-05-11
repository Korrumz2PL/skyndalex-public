const Discord = require('discord.js-light')
module.exports = async (client, oldMember, newMember) => {
  if(oldMember.user.username!=newMember.user.username) return
  if(oldMember.user.avatar!=newMember.user.avatar) return
 // if(oldMember.user.flags.bitfield!=newMember.user.flags.bitfield) return
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(newMember.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsMemberRolesUpdate FROM ServerSettings WHERE ID=?`).get(newMember.guild.id).logsMemberRolesUpdate==="true") {
      if(oldMember.roles.cache.map(r=>r.id).toString()!=newMember.roles.cache.map(r=>r.id).toString()) {
      let embed = new Discord.MessageEmbed()
      .setColor('#ff8800')
      .setTitle('Logi - Zmiana ról użytkownika')
      .setAuthor(newMember.user.username, newMember.user.displayAvatarURL({dynamic: true}))
      embed.addField('Role przed', oldMember.roles.cache.map(r => `${r}`).join(' | '))
      embed.addField('Role po', newMember.roles.cache.map(r => `${r}`).join(' | '))
      newMember.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(newMember.guild.id).logsChannel).send(embed)
    }
    }
    if(client.dbs.prepare(`SELECT logsMemberUpdate FROM ServerSettings WHERE ID = ?`).get(newMember.guild.id).logsMemberUpdate==="true") {
      if(oldMember.nickname!=newMember.nickname) {
  /*    let embed = new Discord.MessageEmbed()
      .setColor('#ff8800')
      .setTitle('Logi - Aktualizacja użytkownika')
      .setDescription(`${oldMember.user.username} -> ${newMember.user.username}`)
      .addField('Avatar', `${oldMember.user.displayAvatarURL({dynamic: true})} -> ${newMember.user.displayAvatarURL({dynamic: true})}`)
if(oldMember.nickname)      embed.addField('Pseudonim przed', oldMember.nickname)
if(!oldMember.nickname) embed.addField('Błąd', 'Użytkownik nie miał pseudonimu')
if(newMember.nickname) embed.addField('Pseudonim po', newMember.nickname)
if(!newMember.nickname) embed.addField('Błąd', 'Użytkownik nie ma pseudonimu')
embed.addField('Role przed', oldMember.roles.cache.map(r => `${r}`).join(' | '))
embed.addField('Role po', newMember.roles.cache.map(r => `${r}`).join(' | '))
    newMember.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(newMember.guild.id).logsChannel).send(embed)

      */
      let embed = new Discord.MessageEmbed()
      .setColor('#ff8800')
      .setTitle('Logi - Zmiana pseudonimu użytkownika')
      .setAuthor(newMember.user.username, newMember.user.displayAvatarURL({dynamic: true}))
      if(oldMember.nickname)      embed.addField('Pseudonim przed', `\`\`\`${oldMember.nickname}\`\`\``)
      if(!oldMember.nickname) embed.addField('Pseudonim przed', 'Brak')
if(newMember.nickname) embed.addField('Pseudonim po', `\`\`\`${newMember.nickname}\`\`\``)
      if(!newMember.nickname) embed.addField('Pseudonim po', 'Brak')
      newMember.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(newMember.guild.id).logsChannel).send(embed)
    }
    }
  
}
  }