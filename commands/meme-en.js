const request = require("request");
const Discord = require("discord.js");
exports.run = (client, message, args, level) => {
    try {
        request(`https://some-random-api.ml/meme`, function(
            error,
            response,
            body
        ) {
            let json = JSON.parse(body);
            const tekstemb = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Oto twój mem!")
                .setImage(json.image || "BRAK")
                .setFooter("Chciałbyś zobaczyć polskie memy? wpisz samo !!mem")
                .setTimestamp();
            message.channel.send(tekstemb);
            return;
        });
    } catch (err) {
        const txtemb = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Error: " + err);
        return message.channel.send(txtemb);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "meme-en",
    category: "🎉 | 4fun",
    description: "Pokazuje angielskiego mema!",
    usage: "meme-en"
};
