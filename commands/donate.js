const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
let embed = new Discord.MessageEmbed()
.setTitle(`Wspieranie bota.`)
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
.setDescription(`Hej! Chciałbyś wesprzeć nasze prace nad botem? Wejdź w ten [link](https://tipply.pl/u/skyndalex)`)
.addField('Akceptowalne formy płatności', 'Blik, dotpay, sms+, sms, pay-pal, PaySafeCard')
    .setFooter(`PAYSAFECARD JEST JUŻ DOSTĘPNE!`)
.setColor("GREEN")
message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["donejt"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "donate",
  category: "🇮 | Informacyjne",
  description: "Wesprz bota!",
  usage: "donate"
};
