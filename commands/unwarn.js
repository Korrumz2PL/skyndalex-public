const Discord = require("discord.js");
exports.run = async (client, message, args) => {
let argumentsembed = new Discord.MessageEmbed()
      	.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
	.setDescription(`Nie podałeś argumentów!`)
	.setColor(`RED`)
let findembed = new Discord.MessageEmbed()
      	.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
	.setDescription(`Nie znaleziono warna! Musisz wpisać ID warna który jest w !!warnlist (numer po #)`)
	.setImage('https://i.imgur.com/3OaTqqV.png')
	.setColor(`RED`)
let botwarns = new Discord.MessageEmbed()
      	.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
	.setDescription(`Bot nie może mieć warna!`)
	.setColor(`RED`)
let userfindembed = new Discord.MessageEmbed()
	.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
	.setDescription(`Nie znaleziono użytkownika na serwerze!`)
	.setColor(`RED`)
let embed123 = new Discord.MessageEmbed()
	.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))	
	.setDescription(`Ten użytkownik nie jest przypisany do tego warna!`)
	.setColor(`RED`)
if(!args[0]) return message.channel.send(argumentsembed)
let user = client.users.cache.get(args[0])||message.mentions.users.first()
if(!client.dbs.prepare('SELECT warnid FROM Warns WHERE warnid=?').get(`${args[1]}`)) return message.channel.send(findembed)
if(user.bot) return message.channel.send(botwarns)
if(!message.guild.members.cache.get(user.id)) return message.channel.send(userfindembed)
let id = client.dbs.prepare('SELECT warnid FROM Warns WHERE warnid=?').get(`${args[1]}`).warnid
if(client.dbs.prepare('SELECT userid FROM Warns WHERE warnid=?').get(`${args[1]}`).userid!==user.id) return message.channel.send(embed123)
let embed = new Discord.MessageEmbed()
.setTitle('Usunięto ostrzeżenie')
.setDescription(`${user.tag} ma teraz ${client.dbs.prepare('SELECT Count() FROM Warns WHERE userid=? AND serverid=?').get(user.id, message.guild.id)["Count()"]-1} warnów`)
.addField('Usunięto warna który miał powód', client.dbs.prepare('SELECT reason FROM Warns WHERE userid=? AND serverid=? AND warnid=?').get(user.id, message.guild.id, id).reason)
.setFooter(`To był warn #${Math.round(id)}`)
message.channel.send(embed)
if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsWarnUser FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsWarnUser==="true") {
      let logEmbed = new Discord.MessageEmbed()
      .setTitle('Logi - Odwarnowano użytkownika!')
    .setColor('#00ff11')
      .setDescription(`Warn #${Math.round(id)}`)
      .addField('Użytkownik który posiadał warna', user.tag+' ('+user.id+')')
      .addField('Warn miał powód', client.dbs.prepare('SELECT reason FROM Warns WHERE userid=? AND serverid=? AND warnid=?').get(user.id, message.guild.id, id).reason)
      .addField('Przez', message.author.tag+' ('+message.author.id+')')
      .addField('Teraz '+user.username+' ma tyle warnów', client.dbs.prepare('SELECT Count() FROM Warns WHERE userid=? AND serverid=?').get(user.id, message.guild.id)["Count()"]-1)
      .setTimestamp()
       message.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsChannel).send(logEmbed)
    }
  }
  client.dbs.prepare('DELETE FROM Warns WHERE warnid=?').run(id)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "unwarn",
  category: "🔨 | Moderacyjne",
  description: "Usuwa ostrzeżenie",
  usage: "unwarn [osoba która dostała warna] [id warna]"
};
