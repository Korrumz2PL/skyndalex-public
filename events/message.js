

module.exports = async (client, message) => {
  const Discord = require("discord.js-light");
  const request = require("request");
  const fs = require("fs");
  if (message.author.bot) return;
  if (message.webhookID) return;
if(message.content.startsWith('?')) {
if(!client.dbs.prepare(`SELECT * FROM ServerSettings WHERE ID = ?`).get(message.guild.id)) {
  client.error(message, `Poczekaj chwilę! Najpierw muszę przygotować bazę danych do tego serwera. Po paru minutach wpisz ponownie komendę.`)
  client.dbs.prepare('INSERT INTO ServerSettings (ID, welcomeEnabled, welcomeMessage, goodbyeEnabled, goodbyeMessage, prefix) VALUES (?,?,?,?,?,?)').run(`${message.guild.id}`, `false`, `Witaj {{user}}`, `false`, `Żegnaj {{user}}`, `?`)
  .catch(err => {
    message.reply('Wystąpił nieoczekiwany błąd! Zgłoś się do programistów')
  })
}
}

if(message.channel.type==="dm") {
  if(message.content==="help") {
    if(!client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(message.author.id)) client.dbs.prepare('INSERT INTO Profil (id) VALUES (?)').run(message.author.id)
    if(client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(message.author.id).ticketsBlocked==="true") return message.channel.send('Posiadasz blokadę na tickety, oznacza to że nie możesz wysyłać ticketów!')
    if(client.dbs.prepare('SELECT * FROM HS WHERE userid = ? AND closed = ?').get(message.author.id, 'false')) return message.channel.send('Masz otwarte zgłoszenie! Możesz mieć tylko jedno otwarte zgłoszenie na konto')
    const id = Math.round(client.dbs.prepare('SELECT * FROM `HS` ORDER BY `HS`.`id` DESC LIMIT 1').get().id)+1
    const response = await client.awaitReply(message, `Napisz problem (opisując problem zgadzasz się na udostępnienie ekipie bota twój nick, tag oraz id) aby anulować zgłoszenie wpisz teraz \`nie\``);
    if(response.content.toLowerCase()==="nie") return message.author.send('Anulowano twoje zgłoszenie')
    let allMessages = `T: ${response.content}`
  client.dbs.prepare('INSERT INTO HS (userid, id, error, closed, startDate, allMessages) VALUES (?, ?, ?, ?, ?, ?)').run(message.author.id, id, response.content, 'false', Date.now(), allMessages)
    let authorEmbed = new Discord.MessageEmbed()
    .setTitle('Zgłoszenie zostało wysłane')
    .setDescription(`Numer twojego zgłoszenia to ${id}`)
    .addField('Treść zgłoszenia', response.content)
    if(response.attachments.map(a=>`${a.name} - ${a.url}`)[0])  authorEmbed.addField('Pliki', response.attachments.map(a=>`${a.name} - ${a.url}`).join(' | '))
    authorEmbed.addField('Informacja', `\nAby dodać coś do swojego zgłoszenia wpisz na dm z botem \`dod ${id} <tekst>\`\nOczekuj odpowiedzi od administracji bota\nAby sprawdzić informacje o tickecie wpisz na dm z botem \`info ${id}\`\nAby sprawdzić komendy na dm z botem wpisz \`komendy\``)
    .setColor('GREEN')
    .setFooter('Skyndalex - Nowoczesny system pomocy')
    message.channel.send(authorEmbed)
   // message.author.send(`Wysłano twoje zgłoszenie. Numer zgłoszenia to ${id}\nTreść twojego zgłoszenia to ${response}\nAby dodać coś do swojego zgłoszenia wpisz na dm z botem \`dod ${id} <tekst>\`\nOczekuj odpowiedzi od administracji bota\nAby sprawdzić informacje o tickecie wpisz na dm z botem \`info ${id}\`\Aby sprawdzić komendy na dm z botem wpisz \`komendy\``)
    let embed = new Discord.MessageEmbed()
    .setFooter('Skyndalex - Nowoczesny system pomocy')
    .setColor('GREEN')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`[AKCJA: Utworzenie zgłoszenia]\nJest to ${message.author.tag} (${message.author.id})`)
    .setTitle(`Użytkownik ma problem!`)
    .addField('Problem', response.content)
    if(response.attachments.map(a=>`${a.name} - ${a.url}`)[0])  embed.addField('Pliki', response.attachments.map(a=>`${a.name} - ${a.url}`).join(' | '))
    embed.addField('Numer zgłoszenia', id)
    .addField('Odpisz mu', `Aby to zrobić wpisz ${client.dbs.prepare('SELECT prefix FROM ServerSettings WHERE ID = ?').get('707506586184319036').prefix}hsm odp ${id} <odpowiedź>`)
    .setFooter('Skyndalex - Nowoczesny system pomocy')
  client.guilds.cache.get("707506586184319036").channels.cache.get('734867595806638091').send(embed)
  return;
  }
  if(message.content.startsWith("ct")) {
    if(!client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(message.author.id)) client.dbs.prepare('INSERT INTO Profil (id) VALUES (?)').run(message.author.id)
    if(client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(message.author.id).ticketsBlocked==="true") return message.channel.send('Posiadasz blokadę na tickety, oznacza to że nie możesz wysyłać ticketów!')
    let args = message.content
    .slice()
    .trim()
    .split(/ +/g);
    if(!client.dbs.prepare('SELECT * FROM HS WHERE id = ? AND closed = ? AND userid = ?').get(args.slice(1), 'false', message.author.id)) return message.channel.send('Nie znaleziono tego zgłoszenia')
    client.dbs.prepare('UPDATE HS SET closed = ?, closedDate=?, closedBy = ? WHERE id=?').run('true', Date.now(), message.author.id, args[1])
    message.author.send('Zgłoszenie zostało zamknięte!')
    let embed = new Discord.MessageEmbed()
    .setTitle(`Zgłoszenie nr ${args[1]} zostało zamknięte`)
    .setDescription('[AKCJA: Zamknięcie zgłoszenia]')
    .addField('Przez', 'Twórcę ticketa')
    .setFooter('Skyndalex - Nowoczesny system pomocy')
  .setColor('RED')
    client.guilds.cache.get("707506586184319036").channels.cache.get('734867595806638091').send(embed)
    return;
  }
  if(message.content.startsWith("dod")) {
    if(!client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(message.author.id)) client.dbs.prepare('INSERT INTO Profil (id) VALUES (?)').run(message.author.id)
    if(client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(message.author.id).ticketsBlocked==="true") return message.channel.send('Posiadasz blokadę na tickety, oznacza to że nie możesz wysyłać ticketów!')
    let args = message.content
    .slice()
    .trim()
    .split(/ +/g);
    if(!client.dbs.prepare('SELECT * FROM HS WHERE id = ? AND userid = ?').get(args[1], message.author.id)) return message.channel.send('Nie znaleziono tego zgłoszenia')
    if(!client.dbs.prepare('SELECT * FROM HS WHERE id = ? AND userid = ?').get(args[1], message.author.id).closed==="true") return message.channel.send("Zgłoszenie jest zamknięte")
    let beforeHistory = client.dbs.prepare('SELECT * FROM HS WHERE id=?').get(args[1]).allMessages
  client.dbs.prepare('UPDATE HS SET allMessages=? WHERE id=?').run(`${beforeHistory}\nT: ${args.slice(2).join(' ')}`, args[1]);
    let info = client.dbs.prepare('SELECT * FROM HS WHERE id = ? AND userid = ?').get(args[1], message.author.id)
    let embed = new Discord.MessageEmbed()
  .setTitle('Informacje o zgłoszeniu '+info.id)
  .setDescription('[AKCJA: Dopisanie wiadomości do zgłoszenia]')
  .addField('Problem', info.error)
  .addField('Dopisał', args.slice(2).join(' '))
if(message.attachments.map(a=>`${a.name} - ${a.url}`)[0])  embed.addField('Dopisane pliki', message.attachments.map(a=>`${a.name} - ${a.url}`).join(' | '))
  embed.addField('Cała historia', info.allMessages)
  .setFooter('Skyndalex - Nowoczesny system pomocy')
  .setColor('GREEN')
  client.guilds.cache.get("707506586184319036").channels.cache.get('734867595806638091').send(embed)
  message.author.send(`Dopowiedziałeś coś do swojego zgłoszenia`)
    return;
  }
  if(message.content.startsWith("info")) {
    if(!client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(message.author.id)) client.dbs.prepare('INSERT INTO Profil (id) VALUES (?)').run(message.author.id)
    if(client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(message.author.id).ticketsBlocked==="true") return message.channel.send('Posiadasz blokadę na tickety, oznacza to że nie możesz wysyłać ticketów!')
    let moment = require('moment-timezone')
    moment.locale('pl')
    let args = message.content
    .slice()
    .trim()
    .split(/ +/g);
    if(!client.dbs.prepare('SELECT * FROM HS WHERE id = ? AND userid = ?').get(args[1], message.author.id)) return message.channel.send('Nie znaleziono tego zgłoszenia')
    let ticket = client.dbs.prepare('SELECT * FROM HS WHERE id = ?').get(args[1])
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
                 if(user) information.addField('Autor', `${user.tag}`);
                 if(!user) information.addField('Autor', `Nie znaleziono!`)
                      information.addField('Stworzono', moment(ticket.startDate).tz('Europe/Warsaw').format('LLLL'))
                      if(ticket.closed==="true") information.addField('Zamknięto', moment(ticket.closedDate).tz('Europe/Warsaw').format('LLLL'))
                      if(ticket.closed==="true"&&user) information.addField('Ticket zamknął', userClosed.tag)
                      if(ticket.closed==="true"&&!user) information.addField('Ticket zamknął', `Nie znaleziono!`)
                      information.addField('Historia (T - twórca zgłoszenia)', ticket.allMessages)
                      information.addField('Treść', ticket.error)
                      .setColor('GREEN')
                      .setFooter('Skyndalex - Nowoczesny system pomocy')
                      message.author.send(information)
    return;
  }
  if(message.content.startsWith("komendy")) {
    if(!client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(message.author.id)) client.dbs.prepare('INSERT INTO Profil (id) VALUES (?)').run(message.author.id)
    if(client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(message.author.id).ticketsBlocked==="true") return message.channel.send('Posiadasz blokadę na tickety, oznacza to że nie możesz wysyłać ticketów!')
    let embedCommandsHsm = new Discord.MessageEmbed()
        .setTitle(`hsm - komendy`)
        .addField(`\`\`help\`\``, `Tworzy zgłoszenie`)
        .addField(`\`\`dod [id] [treść]\`\``, `Dopowiedz coś do twojego zgłoszenia`)
        .addField(`\`\`ct <id>\`\``, `Zamyka zgłoszenie`)
        .addField(`\`\`info <id>\`\``, `Wyświetla informacje o zgłoszenu`)
        .setColor(`GREEN`)
      message.author.send(embedCommandsHsm)
    return;
  }
} else {
    
 
    let db = client.dbs.prepare('SELECT * FROM ServerSettings WHERE ID=?').get(message.guild.id)
  // desing wzmianki

  let wzmianka = new Discord.MessageEmbed()
  .setThumbnail(client.user.displayAvatarURL({size: 1024}))
  .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
  .setTitle("Witaj!")
  .setDescription(`Mój prefix to ${db.prefix}\nPełną listę komend znajdziesz pod komendą ${db.prefix}help`)
  .setColor("RANDOM")

  //Wzmiankaa

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
     return message.channel.send(wzmianka);
  }

  
  //takie konfiguracyjne
  
  let prefix;
  message.guild ? (prefix = db.prefix) : (prefix = `^<@!?${client.user.id}>( |)$`);
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const level = client.permlevel(message);
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  //gban
  let dbp = client.dbs.prepare('SELECT * FROM Profil WHERE id=? AND isgbaned=?').get(message.author.id, "true")
  if(dbp) {
    let gbanEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
    .setTitle("Posiadasz gbana!")
    .setDescription(`Nie możesz używać komend!\nPowód gbana: ${dbp.gbanReason}`)
    .setFooter("Jeżeli chcesz się odwołać napisz do któregoś z programisty a rozpatrzymy twoją prośbę.")
    .setColor("ff0f00")
    return message.channel.send(gbanEmbed)
  }
  if (cmd && cmd.conf.guildOnly && !message.guild) {
    let emb = new Discord.MessageEmbed()
      .setTitle(":x: Komenda dostępna tylko na serwerze")
      .setDescription(
        `Komendę \`${cmd.help.name}\` możesz użyć tylko na serwerze.`
      )
      .setColor("#FF0000");
    return message.channel.send(emb);
  }
 if(client.down===1&&message.author.id!=="484419302200442890") return message.channel.send(`Przerwa techniczna! Powód: ${client.downReason}. Przepraszamy`)
  if (level < client.levelCache[cmd.conf.permLevel]) {
    let emb = new Discord.MessageEmbed()
	.setThumbnail(client.user.displayAvatarURL({size:1024}))
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
      .setTitle("Błąd")
      .setDescription(
        `Komenda \`${cmd.help.name}\` wymaga uprawnienia: \`${
          client.levelCache[cmd.conf.permLevel]
        } - ${cmd.conf.permLevel}\`\nTy posiadasz: \`${level} - ${
          client.config.permLevels.find(l => l.level === level).name
        }\``
      )
      .setColor("#FF0000");
    return message.channel.send(emb);
  }
  message.author.permLevel = level;
  // if(client.aliases.has(command)===true) return message.channel.send('Oj byczq nie ma takiej komendy')
  //let PersonsWhoCanUseBot = ["611605143674421249","484419302200442890","594213351148617728"]
//  if(!PersonsWhoCanUseBot.includes(message.author.id)) return message.channel.send('Tylko wydzielone osoby mogą korzystać z tego bota')
  
  cmd.run(client, message, args, level, prefix);
  }
};

