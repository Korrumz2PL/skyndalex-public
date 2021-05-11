const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
let facts = [
    "W chinach jest zakazane przytulanie drzew",
    "Ludzkie oczy nie zmieniają swojego rozmiaru od urodzenia",
    "Leonardo da vinci portafił malować jedną ręką i jednocześnie pisać drugą",
    "Przeciętny czterolatek zadaje ponad 400 pytań dziennie"
]
    let embed = new Discord.MessageEmbed()
        .setTitle(`Fakt`)
        .setDescription(`${facts.random()}`)
        .setColor(`GREEN`)
        message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "fakt",
    category: "🎉 | 4fun",
    description: "fakt pokazuje",
    usage: "fakt"
};