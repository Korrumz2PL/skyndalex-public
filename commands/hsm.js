const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
const moment = require("moment-timezone")
moment.locale('pl')
  if(args[0]==="odp") {
  if(!args[1]) return message.channel.send('Nie podałeś id zgłoszenia')
  if(!args[2]) return message.channel.send('Nie podałeś treści do odpowiedzi')
  if(!client.dbs.prepare('SELECT * FROM HS WHERE id = ?').get(args[1])) return message.channel.send('Nie znaleziono takiego zgłoszenia')
  if(client.dbs.prepare('SELECT * FROM HS WHERE id = ?').get(args[1]).closed==="true") return message.channel.send('Zgłoszenie jest zamknięte')
  
  
  let beforeHistory = client.dbs.prepare('SELECT * FROM HS WHERE id=?').get(args[1]).allMessages
  client.dbs.prepare('UPDATE HS SET allMessages=? WHERE id=?').run(`${beforeHistory}\n${message.author.tag}: ${args.slice(2).join(' ')}`, args[1]);
    let info = client.dbs.prepare('SELECT * FROM HS WHERE id = ?').get(args[1])
    client.users.fetch(info.userid)
  if(!client.users.cache.get(info.userid)) return message.channel.send('Nie znaleziono użytkownika :O')
  let user = client.users.cache.get(info.userid)
    let embed = new Discord.MessageEmbed()
  .setTitle('Informacje o zgłoszeniu '+info.id)
  .setDescription('[AKCJA: Odpowiedzenie na zgłoszenie]')
  .addField('Problem', info.error)
  .addField('Odpowiedziałeś mu', args.slice(2).join(' '))
  .addField('Użytkownik', `${user.tag} (${user.id}) [Avatar](${user.displayAvatarURL({dynamic: true})})`)
  .addField('Historia wiadomości', info.allMessages)
  .setFooter('Skyndalex - Nowoczesny system pomocy')
  .setColor('GREEN')
  message.channel.send(embed)
  let embedAuthor = new Discord.MessageEmbed()
  .setTitle(`${message.author.tag} odpowiedział na twoje zgłoszenie nr ${info.id}!`)
  .setDescription(`Treść twojego zgłoszenia to ${info.error}`)
  .addField('Odpowiedź', args.slice(2).join(' '))
  .addField('Informacja', `Możesz kontynuować wątek wpisując na dm z botem \`dod ${info.id} <treść>\`\nMożesz zamknąć wątek pisząć na dm z botem \`ct ${info.id}\``)
  .setColor('GREEN')
  .setFooter('Skyndalex - Nowoczesny system pomocy')
 // user.send(`Dostałeś odpowiedź na zgłoszenie o numerze ${info.id}\nTreść zgłoszenia to ${info.error}\nNa twoje zgłoszenie odpowiedział ${message.author.tag}\n${args.slice(2).join(' ')}\nMożesz kontynuować wątek wpisując na dm z botem \`dod ${info.id} <treść>\`\nMożesz zamknąć wątek pisząć na dm z botem \`ct ${info.id}\``).then(() => {
     user.send(embedAuthor).then(() => {
    message.channel.send('Informacje do użytkownika zostały wysłane pomyślnie')
  }).catch(err => {
    message.channel.send(`Nie wysłano informacji do użytkownika z powodu błędu. Możliwe że ktoś zablokował bota lub ma wyłączone dm\nBłąd: ${err}`)
  })
    return;
  } else {
    if(args[0]==="close") {
       if(!args[1]) return message.channel.send('Nie podałeś id zgłoszenia')
       if(!client.dbs.prepare('SELECT * FROM HS WHERE id = ?').get(args[1])) return message.channel.send('Nie znaleziono takiego zgłoszenia')
      let info = client.dbs.prepare('SELECT * FROM HS WHERE id = ?').get(args[1])
      client.dbs.prepare('UPDATE HS SET closed = ?, closedDate=?, closedBy = ? WHERE id=?').run('true', Date.now(), message.author.id, args[1])
      client.users.fetch(info.userid)
  if(!client.users.cache.get(info.userid)) return message.channel.send('Nie znaleziono użytkownika :O')
      let user = client.users.cache.get(info.userid)
      user.send(`Zgłoszenie nr ${args[1]} zostało zamknięte`)
      let embed = new Discord.MessageEmbed()
  .setTitle('Informacje o zgłoszeniu')
  .setDescription('[AKCJA: Zamknięcie zgłoszenia]')
  .addField('Problem', info.error)
  .addField('Użytkownik', `${user.tag} (${user.id}) [Avatar](${user.displayAvatarURL({dynamic: true})})`)
  .setFooter('Skyndalex - Nowoczesny system pomocy')
  .setColor('GREEN')
  message.channel.send(embed)
      return;
    } 
    if(args[0]==="ban") {
      if(!args[1]) return message.channel.send('Nie podałeś kogo mam zbanować')
    let user = client.users.cache.get(args[1])||message.mentions.users.first()
    if(client.dbs.prepare('SELECT ticketsBlocked FROM Profil WHERE ID=?').get(user.id)==="true") return message.channel.send('Użytkownik jest już zbanowany')
      if(client.dbs.prepare('SELECT ticketsBlocked FROM Profil WHERE ID=?').get(user.id)) {
      client.dbs.prepare(`UPDATE Profil SET ticketsBlocked = ? WHERE ID = ?`).run('true', user.id)
    } else {
      client.dbs.prepare('INSERT INTO Profil (id, ticketsBlocked) VALUES (?, ?)').run(user.id, 'true')
    }
    message.channel.send(`Użytkownik ${user.tag} został wykluczony i nie może używać teraz ticketów`)
      return;
    }
    if(args[0]==="unban") {
      if(!args[1]) return message.channel.send('Nie podałeś kogo mam zbanować')
    let user = client.users.cache.get(args[1])||message.mentions.users.first()
    if(client.dbs.prepare('SELECT ticketsBlocked FROM Profil WHERE ID=?').get(user.id)==="false") return message.channel.send('Użytkownik nie jest zbanowany')
      if(client.dbs.prepare('SELECT ticketsBlocked FROM Profil WHERE ID=?').get(user.id)) {
      client.dbs.prepare(`UPDATE Profil SET ticketsBlocked = ? WHERE ID = ?`).run('false', user.id)
    } else {
      client.dbs.prepare('INSERT INTO Profil (id, ticketsBlocked) VALUES (?, ?)').run(user.id, 'false')
    }
    message.channel.send(`Użytkownik ${user.tag} nie jest już wykluczony i może używać teraz ticketów`)
      return;
    }
    
    
  }
  let wait = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setTitle('Czekaj')
  .setDescription('Trwa reagowanie')
  .setFooter('Skyndalex - Help System Manager')
  let emb = new Discord.MessageEmbed()
  .setTitle(`Witaj, ${message.author.username}`)
  .setDescription(`Naciśnij reakcje aby zmienić strony\n🏠 - Ta strona\n<:tickYes:734861870250590388> - Otwarte zgłoszenia\n<:tickNo:734861890920120440> - Zamknięte zgłoszenia\n❔ - Użycie\n🔎 - Sprawdź zgłoszenie z szczegółami`)
  .setColor('GREEN')
  .setFooter('Skyndalex - Help System Manager')
  let opened = new Discord.MessageEmbed()
  .setTitle('Lista otwartych zgłoszeń')
  let arrOp = client.dbs.prepare('SELECT * FROM HS WHERE closed=? LIMIT 25').all('false')
for(let item of arrOp) {
  client.users.fetch(item.userid)
  let user = client.users.cache.get(item.userid)
  opened.addField(`Zgłoszenie - ${item.id}`, `Autor - ${user.tag} (${user.id})\nTreść - ${item.error}`)
}
  opened.setColor('GREEN')
  .setFooter('Skyndalex - Help System Manager')
  let closed = new Discord.MessageEmbed()
  .setTitle('Lista zamkniętych zgłoszeń')
  let arrCl = client.dbs.prepare('SELECT * FROM HS WHERE closed=? LIMIT 25').all('true')
for(let item of arrCl) {
  client.users.fetch(item.userid)
  let user = client.users.cache.get(item.userid)
  closed.addField(`Zgłoszenie - ${item.id}`, `Autor - ${user.tag} (${user.id})\nTreść - ${item.error}`)
}
  closed.setColor('GREEN')
  .setFooter('Skyndalex - Help System Manager')
  let searchQuestion = new Discord.MessageEmbed()
  .setTitle('Napisz numer zgłoszenia')
  .setDescription('Aby anulować akcje wpisz `anuluj`')
  .setColor('GREEN')
  .setFooter('Skyndalex - Help System Manager')
  let help = new Discord.MessageEmbed()
  .setTitle('Zastosowanie opcji w komendzie')
  .setDescription(`hsm odp <id zgłoszenia> <tekst> - Odpowiada na zgłoszenie\nhsm close <id zgłoszenia> - Zamyka zgłoszenie\nhsm ban <id użytkownika/wzminaka> - Blokuje dostęp do używania zgłoszeń\nhsm unban <id użytkownika/wzmianka> - Odblokowywuje dostęp do używania zgłoszeń`)
  .setColor('GREEN')
  .setFooter('Skyndalex - Help System Manager')
  message.channel.send(wait).then(m => {
  m.react('🏠')
  m.react('734861890920120440')
  m.react('734861870250590388')
  m.react('❔')
   m.react('🔎').then(() => m.edit(emb))
  const filter = (reaction, user) => {
                    return ['🏠', 'tickNo', 'tickYes', '❔', '🔎'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
    const collector = m.createReactionCollector(filter, { time: 60000 })
         collector.on('end', () => {
      m.reactions.removeAll()
     })
    collector.on('collect', async reaction => {
                    if(reaction.emoji.name === '🏠') {
                        m.edit(emb)
                    } else if(reaction.emoji.name === 'tickNo') {
                        m.edit(closed);
                    } else if(reaction.emoji.name === "tickYes") {
                      m.edit(opened)
                    } else if(reaction.emoji.name === "❔") {
                      m.edit(help)
                    } else if(reaction.emoji.name === "🔎") {
                      collector.stop()
                      reaction.users.remove(message.author.id)
                      const resp = await client.awaitReplyEdit(message, m)
                      let canceled = new Discord.MessageEmbed()
                      .setTitle('Anulowano')
                      .setColor('RED')
                      .setFooter('Skyndalex - Help System Manager')
                      if(resp.toLowerCase()==="anuluj") return m.edit(canceled)
                      if(!client.dbs.prepare('SELECT * FROM HS WHERE id = ?').get(resp)) return message.channel.send('Nie znaleziono tego zgłoszenia')
                      let ticket = client.dbs.prepare('SELECT * FROM HS WHERE id = ?').get(resp)
                      client.users.fetch(ticket.userid)
                      let user = client.users.cache.get(ticket.userid)
                      let userClosed = client.users.cache.get(ticket.closedBy)
                      let status = {
                        true: "zamknięte",
                        false: "otwarte",
                        null: "otwarte"
                      }
                      let information = new Discord.MessageEmbed()
                      .setTitle(`Informacje o zgłoszeniu nr ${ticket.id}`)
                      .setDescription(`Status - ${status[ticket.closed]}`)
                 if(user) information.addField('Autor', `${user.tag} (${user.id}) [Avatar](${user.displayAvatarURL({dynamic: true})})`);
                 if(!user) information.addField('Autor', `Nie znaleziono! Jego id: ${ticket.userid}`)
                      information.addField('Stworzono', moment(ticket.startDate).tz('Europe/Warsaw').format('LLLL'))
                      if(ticket.closed==="true") information.addField('Zamknięto', moment(ticket.closedDate).tz('Europe/Warsaw').format('LLLL'))
                      if(ticket.closed==="true"&&user) information.addField('Ticket zamknął', userClosed.tag)
                      if(ticket.closed==="true"&&!user) information.addField('Ticket zamknął', `Nie znaleziono! Jego id: ${ticket.closedBy}`)
                      information.addField('Historia (T - twórca zgłoszenia)', ticket.allMessages)
                      information.addField('Treść', ticket.error)
                      .setColor('GREEN')
                      .setFooter('Skyndalex - Help System Manager')
                      m.edit(information)
                    }
      reaction.users.remove(message.author.id)
    })
})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["helpingsystemmanager", "hsmanager"],
  permLevel: "Supporter"
};

exports.help = {
  name: "hsm",
  category: "🔴 | Deweloperskie",
  description: "Help System Manager",
  usage: "hsm"
};

