const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const moment = require('moment-timezone')
let user = client.users.cache.get(args[0])||message.mentions.users.first()||message.author
if(user.bot) return client.error(message, `Boty nie mogą mieć warnów!`)
if(!message.guild.members.cache.get(user.id)) return client.error(message, `Nie ma tego użytkownika na serwerze`)
  if(client.dbs.prepare('SELECT Count() FROM Warns WHERE userid=? AND serverid=?').get(user.id, message.guild.id)["Count()"]===0) return client.done(message, `${user.tag} nie ma warnów.`)
moment.locale('pl')


let xd = new Discord.MessageEmbed()
.setTitle(`Lista ostrzeżeń użytkownika ${user.tag}`)
.setColor('GREEN')
// .addField(`Warn #${Math.round(client.dbs.prepare('SELECT warnid FROM warns WHERE userid=? AND serverid=? ORDER BY `Warns`.`warnid` DESC LIMIT 1').get(user.id, message.guild.id).warnid)}`, `Powód: ${client.dbs.prepare('SELECT reason FROM warns WHERE warnid = ?').get(client.dbs.prepare('SELECT warnid FROM warns WHERE userid=? AND serverid=? ORDER BY `Warns`.`warnid` DESC LIMIT 1').get(user.id, message.guild.id).warnid).reason}\nOstrzeżony przez ${client.users.cache.get(client.dbs.prepare('SELECT warnedbyid FROM Warns WHERE warnid = ?').get(client.dbs.prepare('SELECT warnid FROM warns WHERE userid=? AND serverid=? ORDER BY `Warns`.`warnid` DESC LIMIT 1').get(user.id, message.guild.id).warnid).warnedbyid).tag}\nData: ${moment(client.dbs.prepare('SELECT timestamp FROM Warns WHERE warnid = ?').get(client.dbs.prepare('SELECT warnid FROM warns WHERE userid=? AND serverid=? ORDER BY `Warns`.`warnid` DESC LIMIT 1').get(user.id, message.guild.id).warnid).timestamp).format('LLLL')}`)
let arr = client.dbs.prepare('SELECT * FROM Warns WHERE serverid=? AND userid=? LIMIT 25').all(message.guild.id, user.id)
for(let item of arr) {
  
let dataBefore = moment(item.timestamp);
let data = dataBefore.tz('Europe/Warsaw').format('LLLL')
  xd.addField(`Warn #${item.warnid}`, `Powód: ${item.reason}\nOstrzeżony przez: ${client.users.cache.get(item.warnedbyid).tag}\nData: ${data}`)
}
xd.setFooter(`${user.username} ma już ${client.dbs.prepare('SELECT Count() FROM Warns WHERE userid=? AND serverid=?').get(user.id, message.guild.id)["Count()"]} warnów`)
message.channel.send(xd)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "warnlist",
  category: "🔨 | Moderacyjne",
  description: "Lista ostrzeżeń użytkownika",
  usage: "warnlist"
};
