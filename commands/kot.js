const Discord = require("discord.js");
const { MessageAttachment } = require('discord.js');
exports.run = (client, message, args, level) => {
    /*
    let plik = new MessageAttachment("https://some-random-api.ml/img/cat").setName("kot.jpg");
message.channel.send(plik).catch(err => {
    message.channel.send(`${err}`)
})

     */
    client.error(message, `Ta komenda została wyłączona`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "kot",
    category: "🎉 | 4fun",
    description: "Pokazuje zdjęcie kota",
    usage: "kot"
};
