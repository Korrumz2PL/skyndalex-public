const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  let user = client.users.cache.get(args[0])||message.mentions.users.first()||message.author
  if(user.bot) return message.channel.send('Boty nie mają profili')
  let gban = {
    true:"Tak",
    false:"Nie",
    null:"Nie"
  }
  
  if(args[0]==="legenda") {
        let e = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle('Odznaki')
    .setDescription(`👑 - Właściciel\n<:developer:724373831535558747> - Programista\n🔨 - Support bota\n<:partner:727530456131829891> - Partner\n📃 - Beta-tester\n💰 - Wspierający`)
    message.channel.send(e)
  } else {
  if(args[0]==="ustaw") {
    if(args[1]&&!args[2]) return client.error(message, 'Nie wpisałeś na co mam ustawić')
    if(args[1]==="urodziny") {
      if(args[2]==="usun") {
        client.dbs.prepare('UPDATE Profil SET birthday=? WHERE id=?').run(null, message.author.id)
    client.done(message, `Usunięto datę urodzin`)
      } else {
  if (new RegExp(`^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$`, `g`).test(args[2])) {
    client.dbs.prepare('UPDATE Profil SET birthday=? WHERE id=?').run(args[2], message.author.id)
    client.done(message, `Ustawiono datę urodzin na ${args[2]}`)
  } else {
    if(new RegExp(`^[0-9]{2}\.[0-9]{2}`, `g`).test(args[2])) {
      client.dbs.prepare('UPDATE Profil SET birthday=? WHERE id=?').run(args[2], message.author.id)
      client.done(message, `Ustawiono datę urodzin na ${args[2]}`)
    } else {
    client.error(message, 'Zła data! Musisz podać w formacie dd.mm.yyyy') }
  }
    }} else {
      if(args[1]==="imie") {
        if(args[2]==="usun") {
          client.dbs.prepare('UPDATE Profil SET name=? WHERE id=?').run(null, message.author.id)
       client.done(message, 'Usunięto imię')
        } else {
        client.dbs.prepare('UPDATE Profil SET name=? WHERE id=?').run(Discord.Util.cleanContent(args[2], message).replace('@everyone', '@każdy').replace('@here', '@online'), message.author.id)
        client.done(message, `Ustawiono imię na ${Discord.Util.cleanContent(args[2], message).replace('@everyone', '@każdy').replace('@here', '@online')}`)
      }} else {
        if(args[1]==="www") {
          if(args[2]==="usun") {
            client.dbs.prepare('UPDATE Profil SET www=? WHERE id=?').run(null, message.author.id)
         client.done(message, 'Usunięto stronę internetową')
          } else {
          client.dbs.prepare('UPDATE Profil SET www=? WHERE id=?').run(Discord.Util.cleanContent(args[2], message).replace('@everyone', '@każdy').replace('@here', '@online'), message.author.id)
          client.done(message, `Ustawiono stronę internetową na ${Discord.Util.cleanContent(args[2], message).replace('@everyone', '@każdy').replace('@here', '@online')}`)
        }} else {
          if(args[1]==="email") {
            if(args[2]==="usun") {
              client.dbs.prepare('UPDATE Profil SET email=? WHERE id=?').run(null, message.author.id)
client.done(message, 'Usunięto email')
            } else {
            if(new RegExp('[a-zA-Z0-9._!$%?=*+#-]+@+[a-zA-Z0-9]+[.]+[a-z0-9]*').test(args[2])) {
              client.dbs.prepare('UPDATE Profil SET email=? WHERE id=?').run(Discord.Util.cleanContent(args[2], message).replace('@everyone', '@każdy').replace('@here', '@online'), message.author.id)
          client.done(message, `Ustawiono adres email na ${Discord.Util.cleanContent(args[2], message).replace('@everyone', '@każdy').replace('@here', '@online')}`)
            } else {
              client.error(message, 'Podałeś zły format emaila musi to być np. nazwa@strona.pl')
            }
          }} else {
            if(args[1]==="wiek") {
              if(args[2]==="usun") {
                client.dbs.prepare('UPDATE Profil SET age=? WHERE id=?').run(null, message.author.id)
	client.done(message, 'Usunięto wiek')
              } else {
              if(!isNaN(args[2])) {
                let age = Math.round(parseInt(args[2]))
                if(age>122||age<=0) return client.error(message, 'Nie możesz ustawić takiego wieku')
                client.dbs.prepare('UPDATE Profil SET age=? WHERE id=?').run(age, message.author.id)
client.done(message, `Ustawiono wiek na ${age}`)
              } else {
                client.error(message, 'Podałeś zły wiek')
              }
            }} else {
    let embed = new Discord.MessageEmbed()
    .setTitle('Ustawienia profilu')
    .setColor('GREEN')
    .addField('profil ustaw urodziny <data>', 'Ustawia twoją datę urodzenia')
    .addField('profil ustaw imie <imie>', 'Ustawia twoje imię')
    .addField('profil ustaw www <strona>', 'Ustawia twoją stronę internetową')
    .addField('profil ustaw email <email>', 'Ustawia twój adres mailowy')
    .addField('profil ustaw wiek <wiek>', 'Ustawia twój wiek')
    .setFooter('Aby usunąć jakąś informację wpisz zamiast wartości usun np. profil ustaw imie usun')
    message.channel.send(embed)
    }}}}}
  } else {
  if(!client.dbs.prepare('SELECT id FROM Profil WHERE id=?').get(user.id)) {
    client.dbs.prepare('INSERT INTO Profil (id) VALUES (?)').run(user.id)
  }

  if(client.dbs.prepare('SELECT badges FROM Profil WHERE id=?').get(user.id).badges) {
    
  
  if(client.dbs.prepare('SELECT badges FROM Profil WHERE id=?').get(user.id).badges===null) {
  let embed = new Discord.MessageEmbed()
  .setTitle(`Profil użytkownika ${user.tag}`)
  .setColor(`GREEN`)
  .setFooter('Legenda odznak pod komendą profil legenda | Informacje o sobie ustaw poprzez profil ustaw')
  .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
  .addField(`Odznaki`, 'Użytkownik')
  .addField(`Globalnie zbanowany?`, gban[client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).isgbaned])
  if(client.dbs.prepare('SELECT gbanReason FROM Profil WHERE ID=?').get(user.id).gbanReason!==null&&client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).isgbaned==="true") embed.addField('Z powodem', client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).gbanReason)
  embed.addField('Ma zablokowane tickety?', gban[client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).ticketsBlocked])
  embed.addField(`Ilość warnów`, client.dbs.prepare('SELECT Count() FROM Warns WHERE userid=? AND serverid=?').get(user.id, message.guild.id)["Count()"])
  .addField('Data urodzenia', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).birthday||"Brak")
  .addField('Imię', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).name||"Brak")
  .addField('Strona internetowa', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).www||"Brak")
  .addField('Email', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).email||"Brak")
  .addField('Wiek', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).age||"Brak")
  message.channel.send(embed)
  } else {

 //   let warnNumbers = client.dbs.prepare('SELECT warnsNumber FROM Profil WHERE id=?').get(user.id).warnsNumber

      let badgesNames = client.dbs.prepare('SELECT badges FROM Profil WHERE id=?').get(user.id).badges
  let badgesEmojis = badgesNames.replace("Właściciel", "👑").replace("Deweloper", "<:developer:724373831535558747>").replace('Support', '🔨')
//  let warnNumbers = client.dbs.prepare('SELECT warnsNumber FROM Profil WHERE id=?').get(user.id).warnsNumber
  let embed = new Discord.MessageEmbed()
  .setTitle(`Profil użytkownika ${user.tag}`)
  .setColor(`GREEN`)
  .setFooter('Legenda odznak pod komendą profil legenda | Informacje o sobie ustaw poprzez profil ustaw')
  .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
  .addField(`Odznaki`, badgesEmojis)
  .addField(`Globalnie zbanowany?`, gban[client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).isgbaned])
  if(client.dbs.prepare('SELECT gbanReason FROM Profil WHERE ID=?').get(user.id).gbanReason!==null&&client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).isgbaned==="true") embed.addField('Z powodem', client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).gbanReason)
  embed.addField('Ma zablokowane tickety?', gban[client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).ticketsBlocked])
  embed.addField(`Ilość warnów`, client.dbs.prepare('SELECT Count() FROM Warns WHERE userid=? AND serverid=?').get(user.id, message.guild.id)["Count()"])
  .addField('Data urodzenia', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).birthday||"Brak")
  .addField('Imię', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).name||"Brak")
  .addField('Strona internetowa', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).www||"Brak")
  .addField('Email', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).email||"Brak")
  .addField('Wiek', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).age||"Brak")
  message.channel.send(embed)
  }} else {
      let embed = new Discord.MessageEmbed()
  .setTitle(`Profil użytkownika ${user.tag}`)
  .setColor(`GREEN`)
  .setFooter('Legenda odznak pod komendą profil legenda | Informacje o sobie ustaw poprzez profil ustaw')
  .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
  .addField(`Odznaki`, 'Użytkownik')
  .addField(`Globalnie zbanowany?`, gban[client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).isgbaned])
  if(client.dbs.prepare('SELECT gbanReason FROM Profil WHERE ID=?').get(user.id).gbanReason!==null&&client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).isgbaned==="true") embed.addField('Z powodem', client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).gbanReason)
  embed.addField('Ma zablokowane tickety?', gban[client.dbs.prepare('SELECT * FROM Profil WHERE ID=?').get(user.id).ticketsBlocked])
  embed.addField(`Ilość warnów`, client.dbs.prepare('SELECT Count() FROM Warns WHERE userid=? AND serverid=?').get(user.id, message.guild.id)["Count()"])
  .addField('Data urodzenia', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).birthday||"Brak")
  .addField('Imię', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).name||"Brak")
  .addField('Strona internetowa', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).www||"Brak")
  .addField('Email', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).email||"Brak")
  .addField('Wiek', client.dbs.prepare('SELECT * FROM Profil WHERE id=?').get(user.id).age||"Brak")
  message.channel.send(embed)
  }
  }
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "profil",
  category: "🛠️ | Narzędzia",
  description: "Pokazuje profil użytkownika",
  usage: "profil"
};

