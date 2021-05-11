const Discord = require('discord.js');
const figlet = require('figlet');
module.exports.run = async (client, message, args) => {
    figlet(`${args.join('\n')}`, function(err,data) {
        if (err) {
            console.log(`${err}`)
            console.dir(err)
            return;
        }
        if (!args[0]) return client.error(`Napisz tekst do przerobienia!`)
        message.channel.send(`\`\`\`js\n${data}\`\`\``)
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["asciii"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "ascii",
    category: "🎉 | 4fun",
    description: "Generowanie tekstu ASCII.",
    usage: "ascii <treść>"
};