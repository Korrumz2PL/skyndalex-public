const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    let role = message.guild.roles.cache.get(client.dbs.prepare('SELECT SlowmodeChannelOff FROM ServerSettings WHERE ID =?').get(message.guild.id).SlowmodeChannelOff)
    let channel = message.guild.channels.cache.get(args[0])||message.mentions.channels.first()
    if (!channel) return client.error(message, `Nie znalazłem kanału.`)
    channel.updateOverwrite(role, {SEND_MESSAGES: false })
    const Embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`Zablokowano kanał.`)
        .setDescription(`${message.author.tag} Zablokował kanał!`)
        .setFooter(`Nazwa kanału: ${channel.name}`)
    message.channel.send(Embed);
    channel.send(`Zablokowano kanał przez <@${user.id}>`)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["lockdown"],
    permLevel: "Moderator"
};

exports.help = {
    name: "lockdown",
    category: "🔨 | Moderacyjne",
    description: "Zamknij kanał",
    usage: "lockdown"
};
