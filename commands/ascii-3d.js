const Discord = require('discord.js');
const figlet = require('figlet')
module.exports.run = async (client, message, args) => {
if (!args[0]) return client.error(message, `Nie podano tekstu do przerobienia!`)
    figlet.text(`${args.join('\n')}`, {
        font: '3D Diagonal',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }, function(err, data) {
        if (err) {
            console.log(err);
            console.dir(err);
            return;
        }
        message.channel.send(`\`\`\`${data}\`\`\``).catch(err => {
            message.channel.send(`\`\`\`${err}\`\`\``)
        })
    });
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "ascii-3d",
    category: "🎉 | 4fun",
    description: "ascii 3d",
    usage: "ascii-3d [tekst]"
};