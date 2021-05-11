const Discord = require('discord.js-light')
module.exports = async (client, member) => {
  if(client.dbs.prepare(`SELECT goodbyeEnabled FROM ServerSettings WHERE ID = ?`).get(member.guild.id).goodbyeEnabled==="true") {
  let tekst = client.dbs.prepare(`SELECT goodbyeMessage FROM ServerSettings WHERE ID = ?`).get(member.guild.id).goodbyeMessage
  .replace('{{user}}', member.user.tag)
  .replace('{{mention}}', member.user)
  .replace('{{nickname}}', member.user.username)
  .replace('{{id}}', member.user.id)
  .replace('{{czlonkowie}}', member.guild.memberCount)
  
  
  let embed = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
      .setTitle('Użytkownik wyszedł z serwera')
  .setDescription(tekst)
  .setFooter('Skyndalex - Pożegnania')
  .setColor('#ff0000')
  member.guild.channels.cache.get(client.dbs.prepare(`SELECT goodbyeChannel FROM ServerSettings WHERE ID = ?`).get(member.guild.id).goodbyeChannel).send(embed)
  }
}