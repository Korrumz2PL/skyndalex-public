const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    if (!args[0]) return client.error(message, `Nie podano treści aktualizacji!`)
    let channel = message.guild.channels.cache.get(client.dbs.prepare(`SELECT serverUpdatesChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).serverUpdatesChannel)
    if (!channel) return client.error(message, `Nie ustawiono wartości kanału aktualizacji serwerowych w komendzie ustaw!`)
    let embed = new Discord.MessageEmbed()
        .setTitle(`Nowa aktualizacja serwera!`)
        .setColor(`GREEN`)
        .setDescription(`${args.join(' ')}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    channel.send(embed).catch(err => {
        message.channel.send(`Bot nie mógł wysłać aktualizacji na kanał\n\`\`\`${err}\`\`\``)
        client.guilds.cache.get('707506586184319036').channels.cache.get('723973152660520980').send(`Jakiś użytkownik spotkał problem korzystając z komendy ServerUpdate a mianowicie ${err}`)
    })
    channel.send(`<@${pingRole.id}>`).then(m => {
        m.delete({timeout: 3000})
    })
    let embedInfo = new Discord.MessageEmbed()
        .setTitle(`Wysłano aktualizację!`)
        .addField(`Treść:`, args.join(' '))
        .setColor(`GREEN`)
    message.channel.send(embedInfo)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['aktualizacjaSerwer'],
    permLevel: "Moderator"
};

exports.help = {
    name: "ServerUpdate",
    category: "🛠️ | Narzędzia",
    description: "Wysyła aktualizację serwerową",
    usage: "ServerUpdate"
};

