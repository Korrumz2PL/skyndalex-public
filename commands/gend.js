const Discord = require('discord.js')
const moment = require('moment-timezone')
  
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  moment.locale('pl')
  if(!args[0]) return client.error(message, 'Nie wpisano id wiadomości')
  if(!client.dbs.prepare('SELECT * FROM Giveaways WHERE messageid = ? AND channelid = ?').get(args[0], message.channel.id)) return client.error(message, 'Nie znaleziono podango giveawaya na tym kanale')
  let g = client.dbs.prepare('SELECT * FROM Giveaways WHERE messageid = ? AND channelid = ?').get(args[0], message.channel.id)
  if(g.ended==='true') return client.error(message, 'Giveaway jest zakończony! Spróbuj =!greroll')
  let channel = message.channel
  let error2 = new Discord.MessageEmbed()
  .setTitle('Nastąpił problem z giveawayem')
  .setDescription('Zareagowała tylko jedna osoba (najprawdopodobniej bot)!')
  .setColor("RED")
  let error = new Discord.MessageEmbed()
  .setTitle('Nastąpił problem z giveawayem')
  .setDescription('Wiadomość z giveawayem albo została skasowana albo bot nie ma do niej dostępu!')
  .setColor("RED")
  channel.messages.fetch(g.messageid)
  let mess = channel.messages.cache.get(g.messageid)
  if(!mess) return channel.send(error)
  mess.reactions.cache.find(r => r.emoji.name===`🎉`).users.fetch()
  if(mess.reactions.cache.find(r => r.emoji.name===`🎉`).count===1) return channel.send(error2)
  let randomid = mess.reactions.cache.find(r => r.emoji.name===`🎉`).users.cache.filter(u => u.id!=client.user.id).map(u => u.id).random()
  client.users.fetch(randomid)
  const winners = client.users.cache.get(randomid).tag
  let e = new Discord.MessageEmbed()
  .setColor(g.hex)
  .setTitle('Wygrał giveawaya')
  .setDescription(winners)
  message.channel.send(e)
  let Edited = new Discord.MessageEmbed()
  .setTitle('Giveaway zakończony!')
  .addField('Do wygrania było', g.toWin)
  .addField('A wygrał to', winners)
  .addField('Gieaway zakończył się o', moment(g.end).tz('Europe/Warsaw').format('LLLL'))
  .setTimestamp()
  .setColor(g.hex)
  .setFooter('Skyndalex - Giveawaye')
  mess.edit(Edited).catch(err => channel.send(`Nastąpił problem!\n${err}`))
  client.dbs.prepare('UPDATE Giveaways SET ended = ? WHERE messageid=?').run('true', g.messageid)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "gend",
  category: "🔨 | Moderacyjne",
  description: "Kończy giveawaya",
  usage: "gend <id wiadomości>"
};