const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    const role = message.guild.roles.cache.get(client.dbs.prepare(`SELECT SlowmodeChannelOn FROM ServerSettings WHERE ID =?`).get(message.guild.id).SlowmodeChannelOn)
    const channel = message.mentions.channels.first()||message.guild.channels.cache.get(args[0])||message.channel;
    channel.updateOverwrite(role, {SEND_MESSAGES: true })
    const Embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`Odblokowano kanał.`)
        .setDescription(`${message.author.tag} odblokował kanał!`)
        .setFooter(`Nazwa kanału: ${channel.name}`)
    message.channel.send(Embed);
    channel.send(`Odblokowano kanał przez <@${user.id}>`)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["unlockdown"],
    permLevel: "Moderator"
};

exports.help = {
    name: "unlockdown",
    category: "🔨 | Moderacyjne",
    description: "Odblokowywuje kanał",
    usage: "unlockdown"
};
