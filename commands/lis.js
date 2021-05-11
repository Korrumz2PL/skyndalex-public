const request = require("request");
const Discord = require("discord.js");
exports.run = (client, message, args, level) => {
  try {
    request(`https://some-random-api.ml/img/fox`, function(
      error,
      response,
      body
    ) {
      let json = JSON.parse(body);
      const tekstemb = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Oto twój lis")
        .setImage(json.link || "BRAK")
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
  aliases: ["lisek"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "lis",
  category: "🎉 | 4fun",
  description: "Pokazuje zdjęcie lisa!",
  usage: "lis"
};
