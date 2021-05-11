const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    const kl = []
    message.guild.channels.cache.forEach(k => {
        if (!k.name.includes("-")) return
        const g = k.name.replace("-", "ˑ")
        k.setName(g)
        kl.push(g)
    });
    let succesembed = new Discord.MessageEmbed()
        .setTitle(`Wykonano`)
        .setDescription(`Zamieniłem znak \`\`-\`\` w każdej nazwie kanału!`)
        .setColor(`GREEN`)
    message.channel.send(succesembed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["space"],
    permLevel: "Moderator"
};

exports.help = {
    name: "spacja",
    category: "🛠️ | Narzędzia",
    description: "Robi spację w każdej nazwie kanału",
    usage: "spacja"
};

