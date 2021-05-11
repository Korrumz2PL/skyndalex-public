const Discord = require('discord.js');
exports.run = async (client, message, args,) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const exampleEmbed = new Discord.MessageEmbed()
        .setAuthor(`Wykonano`, `${message.author.displayAvatarURL({format: 'png', dynamic: true})}`)
        .setTitle(`Awatar użytkownika ${user.username}`)
        .setImage(`${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})}`)
        .setDescription(`[Link](${user.displayAvatarURL()})`)
	    .setFooter(`» Skyndalex - Awatar «`)
        .setColor("RANDOM")
    message.channel.send(exampleEmbed).catch(err => {
        client.error(message, `${err}`)
    })
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["awatar"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "avatar",
    category: "🛠️ | Narzędzia",
    description: "Daje avatar",
    usage: "avatar (wzmianka|id)"
};
