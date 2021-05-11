const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  let user = message.mentions.users.first()||client.users.cache.get(args[0])||client.users.cache.get(args[1])
  if(!user) return message.channel.send('Nie znaleziono użytkownika')
  if(user.bot) return message.channel.send('Boty nie mogą mieć gbana')
  if(args[0]==="un") {
     let userun =  message.mentions.users.first()||client.users.cache.get(args[1])
     client.dbs.prepare('UPDATE Profil  SET isgbaned=? WHERE id=?').run('false', userun.id)
    message.channel.send(`Usunięto gbana dla ${userun.tag}`)
    let gbansChannel = client.guilds.cache.get('769101009024450641').channels.cache.get('769857124615716864')
    let embedGbanRemoved = new Discord.MessageEmbed()
        .setTitle(`Usunięto gbana`)
        .setColor(`RED`)
        .addField(`Przez`, `${message.author.tag}`)
        .addField(`Użytkownik`, `${userun.tag}`)
    gbansChannel.send(embedGbanRemoved)
  } else {
  if(!client.dbs.prepare('SELECT id FROM Profil WHERE id=?').get(user.id)) {
    client.dbs.prepare('INSERT INTO Profil (id) VALUES (?)').run(user.id)
  }
  if(client.dbs.prepare('SELECT isgbaned FROM Profil WHERE ID=?').get(user.id).isgbaned==='true') return message.channel.send('Ta osoba jest zgbanowana')
    
    client.dbs.prepare(`UPDATE Profil SET isgbaned = ? WHERE ID = ?`).run('true', user.id)
    client.dbs.prepare(`UPDATE Profil SET gbanReason =? WHERE ID = ?`).run(args.slice(1).join(' ')||"Nie podano powodu", user.id)
  message.channel.send(`Użytkownik ${user.tag} został globalnie zgbanowany z powodem ${args.slice(1).join(' ')||"Nie podano powodu"}`)
    let gbansChannel = client.guilds.cache.get('769101009024450641').channels.cache.get('769857124615716864')
    let embedGbanAdded = new Discord.MessageEmbed()
        .setTitle(`Dodano gbana!`)
        .addField(`Użytkownik`, `${user.tag}`)
        .addField(`Nadawca`, `${message.author.tag}`)
        .addField(`Powód`, `${args.slice(1).join(' ')||"Nie podano powodu"}`)
        .setColor(`GREEN`)
    gbansChannel.send(embedGbanAdded)
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Programista"
};

exports.help = {
  name: "gban",
  category: "🔴 | Deweloperskie",
  description: "Nadaje gbana użytkownikowi",
  usage: "gban <mention/id>"
};

