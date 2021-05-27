exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Podaj argumenty`)
    if (!args[1]) return client.error(message, `Za mało argumentów!`)
    let percent = Math.floor(Math.random() * (100 - 0) + 0)
    let shipembed = new Discord.MessageEmbed()
        .setTitle(`Ship`)
        .setDescription(`${args[0]} oraz ${args[1]} kochają się na ${percent}%!`)
        .setColor(`GREEN`)
    message.channel.send(shipembed)
};

exports.help = {
    name: "ship",
    description: "ship",
    category: "fun"
}