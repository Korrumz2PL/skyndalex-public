const discord = require("discord.js")
exports.run = async (client, message, args, level) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) {
                return client.error(message, 'Nie masz permisji do banowania!')
        } else {
            let member = message.mentions.members.first()
            if (!args[0]) return client.error(message, `Nie podałeś użytkownika`)
            if (!member) return client.error(message, `Nie znaleziono.`)
            if(member) {
                if(message.guild.members.cache.get(client.user.id).roles.highest.rawPosition<=member.roles.highest.rawPosition) return client.error(message, 'Rola bota jest niżej lub taka sama jak najwyższa rola użytkownika do zbanowania. Nie mogę przez to go zbanować!')
                    member.ban({reason: `${args.slice(1).join(' ')||"Brak powodu"}`}).then(() => {
                    let embed = new discord.MessageEmbed()
                    .setTitle('Zbanowano użytkownika')
                    .setDescription(member.user.tag)
                    .setColor("RED")
                    .addField('Zbanował go', message.author.tag)
                   if(args[2]) embed.addField('Za', `${args.slice(1).join(' ')||"Brak powodu"}`)
                   embed.setFooter('Skyndalex || Ban')
                   .setTimestamp()
                    message.channel.send(embed)
                    // logsBanUserSky
                    if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsEnabled==="true") {
                        if(client.dbs.prepare(`SELECT logsBanUserSky FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsBanUserSky==="true") {
                          let logEmbed = new discord.MessageEmbed()
                          .setTitle('Logi - Zbanowano użytkownika!')
                        .setColor('#ff0000')
                          .addField('Użytkownik zbanowany', member.user.tag+' ('+member.user.id+')')
                          .addField('Za', args.slice(1).join(' ')||"Nie podano powodu")
                          .addField('Przez', message.author.tag+' ('+message.author.id+')')
                          .setTimestamp()
                           message.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsChannel).send(logEmbed)
                        }
                      }
                }).catch(err => {
                    client.error(message, `Nastąpił problem! Sprawdź czy bot ma uprawnienia!\nBłąd: ${err}`)
                    client.guilds.cache.get("707506586184319036").channels.cache.get("723973152660520980").send(`Jakiś użytkownik spotkał problem korzystając z komendy ban a mianowicie ${err}`)
                })
            } else {
                message.channel.send(userembed)
            }}
        }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["zbanuj"],
    permLevel: "Administrator"
};

exports.help = {
    name: "ban",
    category: "🔨 | Moderacyjne",
    description: "Banuje użytkownika",
    usage: "ban [osoba] (powód)"
};

 