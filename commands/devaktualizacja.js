const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    let channelToSend = client.guilds.cache.get('769101009024450641').channels.cache.get('771785640522022912')
    let upd1 = args.join('').split(0)
    let err1 = args.join('').split(1)
    let embedSended = new Discord.MessageEmbed()
        .setTitle(`Nowa aktualizacja bota!`)
        .setDescription(`\`\`\`CSS\n+ ${upd1||"Brak"}\`\`\`\`\`\`arm\n- ${err1||"Brak"}\`\`\``)
        .setColor(`PURPLE`)
    channelToSend.send(embedSended)
    message.channel.send(`ok`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Programista"
};

exports.help = {
    name: "devaktualizacja",
    category: "🔴 | Deweloperskie",
    description: "Wysyła aktualizację bota",
    usage: "devaktualizacja"
};

