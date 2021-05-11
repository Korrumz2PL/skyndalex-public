exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const levelnazwa = client.config.permLevels.find(l => l.level === level).name;
  let pinf = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
    .setFooter(`Skyndalex - wersja ${client.version}`, `https://cdn.discordapp.com/avatars/707650198305767434/5f0954a1cd149b17b074fc01cc739c66.png?size=1024`)
    .setColor("RED")
    .setTitle("Poziom uprawnień " + message.author.username)
    .addField(`Nazwa poziomu:`, levelnazwa, true)
    .addField(`Poziom uprawnienia:`, level, true);
  message.channel.send(pinf);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["permission", "uprawnienia", "level"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "permisje",
  category: "🇮 | Informacyjne",
  description: "pokazuje uprawnienia danej osoby.",
  usage: "permisje"
};
