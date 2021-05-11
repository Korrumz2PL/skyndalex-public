const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Nie podano użytkownika`)
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]);
    let percent = Math.floor(Math.random() * (100 - 0) + 0)
    let promiles = Math.floor(Math.random() * (5 - 0) + 0)
    let randomodp = ["Przestań koronawirusa prześladować", "Czy aby na pewno?", "Też się zdziwiłem"]
    let result = ["pozytywny", "negatywny"]
    let embed = new Discord.MessageEmbed()
        .setTitle(`Wykonano test!`)
        .setColor(`GREEN`)
        .setDescription(`${user.username} poszedł do szpitala i wynik okazał się ${result.random()}!`)
        .setFooter(randomodp.random())
    message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["koronawirus-test"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "covid-test",
    category: "🎉 | 4fun",
    description: "W jakich procentach jesteś zarażony koronawirusem? Możesz sprawdzić to tą komendą!",
    usage: "covid-test"
};