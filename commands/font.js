const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (args[0] === "info") {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Dostępne czcionki`)
                .setColor(`GREEN`)
                .addField(`\`\`3D Diagonal\`\``, `Tekst 3D`)
                .addField(`\`\`Dancing Font\`\``, `Tańcząca czcionka`)
                .addField(`\`\`Ghost\`\``, `Ghast`)
                .addField(`\`\`Graffiti\`\``, `grafitti`)
                .addField(`\`\`Patorjk's Cheese\`\``, `Patorjk's Cheese`)
                .addField(`\`\`Standard\`\``, `Standardowa`)
                .addField(`\`\`Pagga\`\``, `pagga`)
                .addField(`\`\`Pawp\`\``, `Pawp`)
                .setFooter(`Użycie: ?font create [czcionka] [tekst] || Nie wszystko może działać!`)
        message.channel.send(embed)
    } else {
        if (args[0] === "create") {
            if (!args[2]) return client.error(message, `Podaj czcionkę!`)
            if (!args[3]) return client.error(message, `Podaj tekst!`)
            figlet.text(`${args.join('\n').slice(3)}`, {
                font: `${args.join('\n').slice(2)}`,
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
        } else {
            message.channel.send(`Wszystkie informacje o komendzie są pod \`\`font info\`\``)
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Tester"
};

exports.help = {
    name: "font",
    category: "🎉 | 4fun",
    description: "wybierasz czcionkę na którą chcesz przerobić tekst",
    usage: "font"
};