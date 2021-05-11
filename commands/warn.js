const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    if(!args) return client.error(message, `Nie podano argumentów`)
    let user = client.users.cache.get(args[0])||message.mentions.users.first()
    if(!user) return client.error(message, `Nie znaleziono użytkownika`)
    if(user.bot) return message.channel.send(botembed1)
    if(user.id===message.author.id) return message.channel.send(mentionsmeembed)
    if(message.guild.members.cache.get(user.id).roles.highest.rawPosition>=message.member.roles.highest.rawPosition) return client.error(message, `Nie możesz zwarnować użytkownika z rolą wyższą lub taką samą jak ty`)
    let member = message.guild.members.cache.get(user.id)
    if(!member) return client.error(message, `Nie znaleziono użytkownika na serwere`)
    if(message.guild.owner.id===user.id) return client.error(message, `Nie możesz ostrzec właściciela!`)
    /* if(client.dbs.prepare('SELECT warnsNumber FROM Profil WHERE ID=?').get(user.id)) {
          if(client.dbs.prepare('SELECT warnsNumber FROM Profil WHERE ID=?').get(user.id).warnsNumber===null) {
      client.dbs.prepare('UPDATE Profil SET warnsNumber=? WHERE id=?').run('0', user.id)
    } */
    
    //let beforeWarnsNumbers = client.dbs.prepare('SELECT warnsNumber FROM Profil WHERE id=?').get(user.id).warnsNumber
    //client.dbs.prepare('UPDATE Profil SET warnsNumber=? WHERE id=?').run(parseInt(beforeWarnsNumbers)+1, user.id)
    
    // } else {
     /* if(client.dbs.prepare('SELECT id FROM Profil WHERE id=?').get(user.id)) {
      client.dbs.prepare('INSERT INTO Profil (warnsNumber) VALUES (?) WHERE id=?').run('1', user.id)
      } else {
        client.dbs.prepare('INSERT INTO Profil (id, warnsNumber) VALUES (?, ?)').run(user.id, '1')
      } */
    
    // }
      let warnid = Math.round(client.dbs.prepare('SELECT * FROM `Warns` ORDER BY `Warns`.`warnid` DESC LIMIT 1').get().warnid)+1;
      if(!client.dbs.prepare('SELECT * FROM `Warns` ORDER BY `Warns`.`warnid` DESC LIMIT 1').get().warnid) {
        client.error(message, 'Wystąpił poważny błąd z bazą danych! Jak najszybciej skontaktuj się z programistami bota!\n Możesz to zrobić za pomocą napisania `help` na dm z botem')
        // 712322232940101634
        client.guilds.cache.get("707506586184319036").channels.cache.get("723973152660520980").send(`<@&713366611746357258> UWAGA WYSTĄPIŁ BARDZO POWAŻNY PROBLEM!!! BAZA DANYCH ZOSTAŁA USZKODZONA!\nWpisz \`\`\`?meval client.dbs.prepare('INSERT INTO Warns (warnid, userid, serverid, reason, warnedbyid, timestamp) VALUES (?, ?, ?, ?, ?, ?)').run(1, '594213351148617728','707506586184319036', "Nie podano powodu", '484419302200442890', Date.now())\`\`\`\n<@&712322232940101634>`)
      } else {
     client.dbs.prepare('INSERT INTO Warns (warnid, userid, serverid, reason, warnedbyid, timestamp) VALUES (?, ?, ?, ?, ?, ?)').run(warnid, user.id, message.guild.id, args.slice(1).join(' ')||"Nie podano powodu", message.author.id, Date.now())
    
    let embed = new Discord.MessageEmbed()
    .setTitle('Ostrzeżono użytkownika')
    .setDescription(user.tag)
    .addField('Przez', message.author.tag)
    .addField('Za', args.slice(1).join(' ')||"Nie podano powodu")
    .addField('Ilość ostrzeżeń', client.dbs.prepare('SELECT Count() FROM Warns WHERE userid=? AND serverid=?').get(user.id, message.guild.id)["Count()"])
    .setFooter(`Skyndalex ${client.version} - Warn #${Math.round(client.dbs.prepare('SELECT * FROM `Warns` ORDER BY `Warns`.`warnid` DESC LIMIT 1').get().warnid)}`)
    .setColor('GREEN')
    message.channel.send(embed)
    if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsEnabled==="true") {
      if(client.dbs.prepare(`SELECT logsWarnUser FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsWarnUser==="true") {
        let logEmbed = new Discord.MessageEmbed()
        .setTitle('Logi - Zwarnowano użytkownika!')
      .setColor('#00ff11')
        .setDescription(`Warn #${Math.round(client.dbs.prepare('SELECT * FROM `Warns` ORDER BY `Warns`.`warnid` DESC LIMIT 1').get().warnid)}`)
        .addField('Użytkownik zwarnowany', user.tag+' ('+user.id+')')
        .addField('Za', args.slice(1).join(' ')||"Nie podano powodu")
        .addField('Przez', message.author.tag+' ('+message.author.id+')')
        .addField('Ilość ostrzeżeń zwarnowanej osoby', client.dbs.prepare('SELECT Count() FROM Warns WHERE userid=? AND serverid=?').get(user.id, message.guild.id)["Count()"])
        .setTimestamp()
         message.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsChannel).send(logEmbed)
      }
    }
message.delete()
      }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ostrzez"],
    permLevel: "Moderator"
};

exports.help = {
    name: "warn",
    category: "🔨 | Moderacyjne",
    description: "Ostrzega użytkownika",
    usage: "warn [osoba] (powód)"
};
