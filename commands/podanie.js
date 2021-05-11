const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    if (!args[0]) return client.error(message, `Nie podano treści podania!`)
    let channel = message.guild.channels.cache.get(client.dbs.prepare(`SELECT passChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).passChannel)
    let pingRole = message.guild.roles.cache.get(client.dbs.prepare(`SELECT roleBroadcastPing FROM ServerSettings WHERE ID = ?`).get(message.guild.id).roleBroadcastPing)
    if (!channel) return client.error(message, `Nie ustawiono wartości kanału z podaniami w komendzie ustaw!`)
    let embed = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setDescription(args.join(' '))
        .addField(`Zgłaszający`, `${message.author.tag}`)
    channel.send(embed).catch(err => {
        message.channel.send(`Bot nie mógł wysłać podania na kanał\n\`\`\`${err}\`\`\``)
        client.guilds.cache.get('707506586184319036').channels.cache.get('723973152660520980').send(`Jakiś użytkownik spotkał problem korzystając z komendy oglos a mianowicie ${err}`)
    })
    message.delete()
    channel.send(`<@${pingRole.id}>`).then(m => {
        m.delete({timeout: 3000})
    })
    let embedInfo = new Discord.MessageEmbed()
        .setTitle(`Wysłano podanie`)
        .setColor(`GREEN`)
    message.channel.send(embedInfo)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pass"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "podanie",
    category: "🛠️ | Narzędzia",
    description: "Wysyła podanie",
    usage: "podanie"
};

