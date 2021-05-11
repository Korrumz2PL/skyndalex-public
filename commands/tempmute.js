const discord = require("discord.js")
exports.run = async (client, message, args, level) => {
    /*
    let member = message.mentions.members.first()
    if (!args[0]) return client.error(message, `Nie podano użytkownika`)
    if (!member) return client.error(message, `Nie znaleziono użytkownika`)
    const role = message.guild.roles.cache.get(client.dbs.prepare("SELECT mutedRole FROM ServerSettings WHERE ID = ?").get(message.guild.id).mutedRole)
    
     */
message.channel.send(`Komenda jest jeszcze niedokończona!`)

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["muteczas"],
    permLevel: "Tester"
};

exports.help = {
    name: "tempmute",
    category: "🔨 | Moderacyjne",
    description: "Wycisza użytkownika na czas",
    usage: "tempmute (osoba) (powód)"
};

