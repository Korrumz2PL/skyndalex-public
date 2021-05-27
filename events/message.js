const Discord = require('discord.js-light')
module.exports = (client, message) => {
    const { prefix }  = require("../config.json");
    const Discord = require('discord.js-light')
    let embedMention = new Discord.MessageEmbed()
        .setTitle(`Oznaczyłeś mnie!`)
        .addField(`Prefix`, `c?`)
        .addField(`Komenda pomocy`, `c?help`)
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        return message.channel.send(embedMention)
    }

    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);

    if (!cmd) return;

    cmd.run(client, message, args);
}