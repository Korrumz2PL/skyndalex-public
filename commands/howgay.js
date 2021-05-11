const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;
    const Embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
        .setColor(`RED`)
        .setDescription(`<@${user.id}> jest gejem w ${Math.floor(Math.random() * (100 - 0) + 0)}%`)
    message.channel.send(Embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["howgay"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "howgay",
    category: "🎉 | 4fun",
    description: "",
    usage: "iq"
};
