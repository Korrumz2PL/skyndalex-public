exports.run = async (client, message, args) => {
    const Discord = require('discord.js-light')
let embedHelp = new Discord.MessageEmbed()
    .setTitle(`Pomoc komend`)
    .setDescription(`Potrzebujesz pomocy? Wejdź na nasz support lub skontaktuj się za pomocą adresu e-mail: **kontakt@cobrabot.tk**`)
    .addField(`Komendy 4Fun`, `> \`\`${client.commands.filter(c => c.help.category==="fun").map(c => c.help.name).join(" | ")||"Brak komend 4fun"}\`\``)
    .addField(`Komendy deweloperskie`, `> \`\`${client.commands.filter(c => c.help.category==="devs").map(c => c.help.name).join(" | ")||"Brak komend deweloperskich"}\`\``)
    .addField(`Narzędzia`, `> \`\`${client.commands.filter(c => c.help.category==="tools").map(c => c.help.name).join(" | ")||"Brak narzędzi."}\`\``)
    .addField(`Bot`, `> \`\`${client.commands.filter(c => c.help.category==="bot").map(c => c.help.name).join(" | ")||"Brak"}\`\``)
    .addField(`Moderacja`, `> \`\`${client.commands.filter(c => c.help.category=="mods").map(c => c.help.name).join(" | ")||"Brak"}\`\``)
    .setColor(`GREEN`)
    message.channel.send(embedHelp)
}

exports.help = {
    name: "help",
    description: "Menu pomocy bota",
    category: "bot",
    aliases: ["h", "pomoc", "halp"]
}