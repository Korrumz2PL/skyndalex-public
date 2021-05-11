const Discord = require('discord.js-light')
module.exports = async (client, member) => {
  if(client.dbs.prepare(`SELECT welcomeEnabled FROM ServerSettings WHERE ID = ?`).get(member.guild.id).welcomeEnabled==="true") {
  let tekst = client.dbs.prepare(`SELECT welcomeMessage FROM ServerSettings WHERE ID = ?`).get(member.guild.id).welcomeMessage
  .replace('{{user}}', member.user.tag)
  .replace('{{mention}}', member.user)
  .replace('{{nickname}}', member.user.username)
  .replace('{{id}}', member.user.id)
  .replace('{{czlonkowie}}', member.guild.memberCount)

  let embed = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
      .setTitle('Użytkownik dołączył na serwer!')
  .setDescription(tekst)
  .setColor('#34eb43')
  member.guild.channels.cache.get(client.dbs.prepare(`SELECT welcomeChannel FROM ServerSettings WHERE ID = ?`).get(member.guild.id).welcomeChannel).send(embed)
}
}