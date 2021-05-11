const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    // addedTexts - database
if (args[0] === "add") {
    if (!args[2]) return client.error(mesage, `Nie podano tekstu do dodania na listę todo!`)
    let todoNumberRandom = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    let textTodo = args.join(' ').slice(3)
    let embed = new Discord.MessageEmbed()
        .setTitle(`Dodano treść do twojego todo.`)
        .setDescription(`Numerem twojego todo jest ${todoNumberRandom.random()}\nTreść: ${textTodo}`)
        .setColor(`GREEN`)
    message.channel.send(embed)
    } else {
    if (args[0] === "remove") {
        if (!args[1]) return client.error(message, `Nie wpisano numeru treści którą chcesz usunąć z todo!`)
        let embedClosedTodoEmbed = new Discord.MessageEmbed()
            .setTitle(`Usunięto treść z todo`)
            .setDescription(`Numer treści usuniętej: ${args[1]}`)
            .setColor(`GREEN`)
        message.channel.send(embedClosedTodoEmbed)
    } else {
        if (args[0] === "list") {
            let embedListTodoEmbed = new Discord.MessageEmbed()
                .setTitle(`Lista todo`)
                .addField(`Użytkownik`, `${user.tag}`)
                .setDescription(`Funkcja nie została dokończona!`)
                .setColor(`GREEN`)
            message.channel.send(embedListTodoEmbed)
        } else {
            let embedInfo = new Discord.MessageEmbed()
                .setFooter(`Skyndalex ${client.version} || todo`)
                .setTitle(`Nowy system todo`)
                .setDescription(`Dostępne komendy:\n 1:\`\`todo add\`\`\n2: \`\`todo remove (numer)\`\`\n 3: \`\`todo list\`\``)
                .setColor(`GREEN`)
            message.channel.send(embedInfo)
        }
        }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["todo"],
    permLevel: "Tester"
};

exports.help = {
    name: "todo",
    category: "🎉 | 4fun",
    description: "Todo",
    usage: "todo"
};