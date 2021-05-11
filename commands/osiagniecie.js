const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {

if(!args[0]) {
client.error(message, 'Wpisz tekst!')
} else {
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Osiągnięcie zdobyte!')
        .setImage(`https://api.alexflipnote.dev/achievement?text=${encodeURIComponent(args.join(" ").replace('ą', 'a').replace('ę', 'e').replace('ł', 'l').replace('ż', 'z').replace('ź', 'z').replace('ó', 'o').replace('ć', 'c').replace('ś', 's').replace('ń','n'))}`)
        .setTimestamp()    
    message.channel.send(embed).catch(err => {
        message.channel.send(err)
    })
}
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["osiog"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "osiagniecie",
  category: "🎉 | 4fun",
  description: "Generuje osiągnięcie minecraft.",
  usage: "osiagniecie <tekst>"
};
