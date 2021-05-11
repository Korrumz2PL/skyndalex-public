const ms = require('ms');
const Discord = require('discord.js')
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if(!args[0]) return client.error(message, `Nie podano argumentów\nPoprawne użycie: gstart <czas> <ile ma osób wygrać> <kolor hex embeda> <co do wygrania>`)
  if(args[0].includes('h')||args[0].includes('d')||args[0].includes('m')) {
  if(!args[1]) return client.error(message, 'Nie podałeś ile osób ma wygrać')
  if(isNaN(args[1])===true) return client.error(message, 'Podałeś złą liczbę osób którą mają wygrać')
  if(args[1]!=1) return client.error(message, 'Giveaweye są w wersji alpha! Nie obsługują wielu osób które mają wygrać')
  if(args[1]>20) return client.error(message, 'Maksymalna liczba osób które mogą wygrać to 20')
  if(!args[2]) return client.error(message, 'Nie podałeś koloru hex')
  if(!args[3]) return client.error(message, 'Nie podałeś co można wygrać')
  let embed = new Discord.MessageEmbed()
  .setTitle('Giveaway!')
  .setColor(args[2])
  .setDescription('Zaznacz reakcje 🎉 aby wziąć udział w giveawayu')
  .addField('Będzie on trwał', ms(ms(args[0]), { long: true }).replace(/minuts/g,'minut').replace(/godzin/g,'godziny').replace('second', 'sekund').replace('day', 'dni'))
  .addField('Liczba osób które wygra', args[1])
  .addField('Do wygrania jest', args.slice(3).join(' '))
  .setFooter('Skyndalex - Giveaway')
  
  message.channel.send(embed).then(m => {
    m.react('🎉')
    client.dbs.prepare('INSERT INTO Giveaways (guildid, channelid, messageid, end, toWin, hex, winnersNumber, ended) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(String(message.guild.id), String(message.channel.id), String(m.id), Date.now()+ms(args[0]), args.slice(3).join(' '), args[2], args[1], 'false')
  })
  //message.channel.send(`no to trwać bendzie ${ms(ms(args[0]), { long: true }).replace('minute','minut').replace('hour','godzin').replace('second', 'sekund').replace('day', 'dni')} a wygra ${args[1]}`)
  } else return client.error(message, 'Podałeś zły czas')
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "gstart",
  category: "🔨 | Moderacyjne",
  description: "Rozpoczyna giveawaya.",
  usage: "gstart <czas> <ile ma osób wygrać> <kolor hex embeda> <co do wygrania>"
};