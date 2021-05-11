const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]);
    let embed1 = new Discord.MessageEmbed()
        .setColor(`ORANGE`)
        .setTitle(`Slap!`)
        .setDescription(`${message.author.username} uderzył ${user.username}`)
        .setImage(`https://media1.giphy.com/media/gSIz6gGLhguOY/giphy.gif`)
    message.channel.send(embed1)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["slap"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "uderz",
    category: "🎉 | 4fun",
    description: "Uderza",
    usage: "slap <uzytkownik>"
};
