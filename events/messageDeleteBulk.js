const Discord = require('discord.js-light')
module.exports = async (client, message) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(message.map(m=>m)[1].channel.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsBulkDelete FROM ServerSettings WHERE ID = ?`).get(message.map(m=>m)[1].channel.guild.id).logsBulkDelete==="true") {
      
    let tof = {
          false: "Nie",
          true: "Tak"
        }
    const hastebin = require('hastebin.js');
const haste = new hastebin({ /* url: 'hastebin.com */ });
 
haste.post(`Usunięto ${message.size} wiadomości w kanale ${message.map(m=>m)[1].channel.name}. Poniżej zostały one wypisane\n\n`+message.map(m=>`Autor wiadomości: ${m.author.tag} (${m.author.id}) ID wiadomości: ${m.id} Zawartość:\n${m.content}`).join(`\n`)).then(link => {
    let moment = require('moment-timezone')
    moment.locale('pl')
    let embed = new Discord.MessageEmbed()
    .setTitle('Logi - Usunięto wiele wiadomość!')
    .addField('Link do hastebinu', link)
    .setColor('#ff0000')
    
  message.map(m=>m)[1].channel.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(message.map(m=>m)[1].channel.guild.id).logsChannel).send(embed)
  })
}
  }
}  