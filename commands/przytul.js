const request = require("request");
const Discord = require("discord.js");
exports.run = (client, message, args, level) => {
  try {
    request(`https://some-random-api.ml/animu/hug`, function(
        error,
        response,
        body
    ) {
      let json = JSON.parse(body);
      const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;
      const tekstemb = new Discord.MessageEmbed()
          .setColor("RANDOM")
	  .addField(`${message.author.username} przytulił ${user.username}`, `Jak słodko!`)
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
  aliases: ["tuli"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "przytul",
  category: "🎉 | 4fun",
  description: "Przytula daną osobe!!",
  usage: "przytul"
};
