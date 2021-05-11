const Discord = require('discord.js-light')
const moment = require('moment-timezone')
module.exports = async client => {
  client.user.setActivity('https://skyndalex.tk')

  setInterval(async function(){
    let d = client.dbs.prepare('SELECT * FROM Giveaways WHERE ended = ?').all('false').filter(d => d.end <= Date.now()); 
  let g = "";
  for(g of d) {
    let guild = client.guilds.cache.get(g.guildid)
    if(!guild) {
      client.dbs.prepare('UPDATE Giveaways SET ended = ? WHERE messageid=?').run('true', g.messageid);
      return;
    }
    client.channels.fetch(g.channelid);
    client.channels.fetch(g.channelid);
    let channel = guild.channels.cache.get(g.channelid)
    if(!channel) {
      client.dbs.prepare('UPDATE Giveaways SET ended = ? WHERE messageid=?').run('true', g.messageid);
      return;
    }
    channel.messages.fetch(g.messageid);
    channel.messages.fetch(g.messageid);
    channel.messages.fetch(g.messageid);
    let mess = channel.messages.cache.get(g.messageid)
    let error = new Discord.MessageEmbed()
    .setTitle('Nastąpił problem z giveawayem')
    .setDescription(`Wiadomość z giveawayem albo została skasowana albo bot nie ma do niej dostępu!\nSpróbuj ponownie komendą greroll`)
    .setColor("RED")
    let error2 = new Discord.MessageEmbed()
    .setTitle('Nastąpił problem z giveawayem')
    .setDescription(`Zareagowała tylko jedna osoba (najprawdopodobniej bot)!\nSpróbuj ponownie komendą greroll`)
    .setColor("RED")
    if(!mess) { 
      channel.send(error)
      client.dbs.prepare('UPDATE Giveaways SET ended = ? WHERE messageid=?').run('true', g.messageid);
      return;
    }
    mess.reactions.cache.find(r => r.emoji.name===`🎉`).users.fetch();
    mess.reactions.cache.find(r => r.emoji.name===`🎉`).users.fetch();
    if(mess.reactions.cache.find(r => r.emoji.name===`🎉`).count===1) {
      channel.send(error2)
      client.dbs.prepare('UPDATE Giveaways SET ended = ? WHERE messageid=?').run('true', g.messageid);
      return;
    }
    let randomid = mess.reactions.cache.find(r => r.emoji.name===`🎉`).users.cache.filter(u => u.id!=client.user.id).map(u => u.id).random()
    client.users.fetch(randomid);
    const winners = client.users.cache.get(randomid).tag
    let Embed = new Discord.MessageEmbed()
    .setTitle('GIVEAWAY ZAKOŃCZONY')
    .addField('Do wygrania było', g.toWin)
    .addField('Wygrał', winners)
    .setTimestamp()
    .setColor(g.hex)
    .setFooter('Skyndalex - Giveawaye')
    client.dbs.prepare('UPDATE Giveaways SET ended = ? WHERE messageid=?').run('true', g.messageid)
    channel.send(Embed)
    let Edited = new Discord.MessageEmbed()
    .setTitle('Giveaway zakończony!')
    .addField('Do wygrania było', g.toWin)
    .addField('A wygrał to', winners)
    .addField('Gieaway zakończył się o', moment(g.end).tz('Europe/Warsaw').format('LLLL'))
    .setTimestamp()
    .setColor(g.hex)
    .setFooter('Skyndalex - Giveawaye')
    mess.edit(Edited).catch(err => channel.send(`Nastąpił problem!\n${err}`))
  }
    },60000)

};
