const discord = require("discord.js")
exports.run = async (client, message, args, level) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) {
        client.error(message, 'Nie masz permisji!')
    } else {
        let member = message.mentions.members.first()
        if(member) {

            member.kick({reason: `Powód: ${args.join('')||"Nie podano"}`}).then(() => {
                let embed = new discord.MessageEmbed()
                    .setTitle('Wyrzucono użytkownika')
                    .setDescription(member.user.tag)
                    .setColor("RED")
                    .addField('Wyrzucił go', message.author.tag)
                if(args.slice(2).join(' ')) embed.addField('Za', args.slice(1).join(' '))
                embed.setFooter('Skyndalex || Kick')
                    .setTimestamp()
                message.channel.send(embed)
                if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsEnabled==="true") {
                    if(client.dbs.prepare(`SELECT logsKickUserSky FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsKickUserSky==="true") {
                        let logEmbed = new discord.MessageEmbed()
                            .setTitle('Logi - Wyrzucono użytkownika!')
                            .setColor('#ff0000')
                            .addField('Użytkownik wyrzucony', member.user.tag+' ('+member.user.id+')')
                            .addField('Za', args.slice(1).join(' ')||"Nie podano powodu")
                            .addField('Przez', message.author.tag+' ('+message.author.id+')')
                            .setTimestamp()
                        message.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsChannel).send(logEmbed)
                    }
                }
            }).catch(err => {
                client.error(message, 'Nie moge wyrzucić tego użytkownika')
            })
        } else {
            client.error(message, 'Podałeś złego użytkownika!')
        }}
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["wyrzuc"],
    permLevel: "Moderator"
};

exports.help = {
    name: "kick",
    category: "🔨 | Moderacyjne",
    description: "Kickuje użytkownika",
    usage: "kick [osoba] (powód)"
};