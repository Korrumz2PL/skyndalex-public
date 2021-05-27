exports.run = async (client, message, args) => {
if (!args[0]) return client.error(message, `Napisz pytanie!`)
    let reponses = [
        "Tak",
        "Nie",
        "Być może",
        "Chyba tak",
        "Chyba nie"
    ]
    let embed = new Discord.MessageEmbed()
        .setTitle(`Magiczna kula`)
        .addField(`Twoje pytanie`, `${args.join(' ')}`)
        .addField(`Odpowiedź`, reponses.random())
        .setColor(`GREEN`)
    message.channel.send(embed)
};

exports.help = {
    name: "8ball",
    description: "Magiczna kula!",
    category: "fun"
}