const discord = require("discord.js")
exports.run = async (client, message, args, level) => {
    const role = message.guild.roles.cache.get(client.dbs.prepare("SELECT mutedRole FROM ServerSettings WHERE ID = ?").get(message.guild.id).mutedRole)
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.mentions.users.first() || message.guild.users.cache.get(args[0])
    if (!member) client.error(message, 'Nie znaleziono użytkownika')
    if (!role) return client.error(message, `Nie ustawiono roli`)
    if (member.id === message.author.id) return client.error(message, 'Nie możesz sam siebie uciszyć!')
    if (member.id === message.guild.owner.id) return client.error(message, 'Nie możesz uciszyć właściciela')
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return client.error(message, 'Nie możesz uciszyć użytkownika z taką samą lub wyższą rolą')
    member.roles.add(role)
    message.channel.send(`Od teraz użytkownik <@${user.id}> nie może pisać na kanale tekstowym.`).catch(err => {
        message.channel.send(`\`\`\`${err}\`\`\``)
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["zmutuj", "ucisz"],
    permLevel: "Moderator"
};

exports.help = {
    name: "mute",
    category: "🔨 | Moderacyjne",
    description: "Wycisza użytkownika",
    usage: "mute"
};