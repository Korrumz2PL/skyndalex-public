const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
  let karma = client.users.cache.get('594213351148617728')
  let korrumz = client.users.cache.get('611605143674421249')
  let minecrafter = client.users.cache.get('484419302200442890')
  let lukasz = client.users.cache.get('674979744290439171')
  let shadowy = client.users.cache.get('575992616332558356')
  let bobos = client.users.cache.get('664393769088712733')
    let xiboon = client.users.cache.get('682582825043492930')
    let wallace = client.users.cache.get('667727937499561984')
    let aleksio = client.users.cache.get('435029733344804874')
    let cyber = client.users.cache.get('682572949219180547')
    let gnuj = client.users.cache.get('444132380119138312')
const exampleEmbed = new Discord.MessageEmbed()
  .setTitle(`Ekipa bota`)
  .setDescription(`Poniżej znajduje się spis ekipy bota.`)
  .addField(`**SUPPORTERZY:**`, `${lukasz.tag} oraz ${shadowy.tag}`)
  .addField(`**Administratorzy:**`, `${karma.tag}`)
  .addField(`**Programiści:**`, `${cyber.tag}`)
  .addField(`**Główni programiści:**`, `${korrumz.tag} oraz ${minecrafter.tag}`)
    .addField(`**Donatorzy**`, `${bobos.tag} | ${gnuj.tag}`)
    .addField(`**Testerzy**`, `${xiboon.tag} | ${aleksio.tag} | ${wallace.tag}`)
  .setColor("RED")
message.channel.send(exampleEmbed);
}


 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["admini"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "ekipa",
  category: "🇮 | Informacyjne",
  description: "Wyświetla ekipę bota",
  usage: "ekipa"
};
