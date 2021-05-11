const moment = require("moment");
moment.locale('pl')
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
  const ms = require('ms'); 
 const guild = client.guilds.cache.get(args[0])||message.guild
 let created = moment(guild.createdAt).tz('Europe/Warsaw').format('LLL')
 let veryfiaction = {
   NONE: "Nie posiada",
   LOW: "Niski",
   MEDIUM: "Średni",
   HIGH: "Wysoki",
   VERY_HIGH: "Bardzo wysoki"
 }
    const members = message.guild.members.cache;
    const exampleEmbed = new Discord.MessageEmbed()
  .setTitle(`Informacje o serwerze ` + `${guild.name}`)
  .setDescription(`Poniżej znajdują się informacje o serwerze.`)
  .addField(`» Właściciel serwera:`, `${guild.owner}`, true)
  .addField(`» Liczba użytkowników:`, `${guild.memberCount}`, true)
  .addField(`» Region serwera:`, `${guild.region}`, true)
  .addField(`» ID serwera:`, `${guild.id}`, true)
  .addField(`» Data stworzenia serwera:`, `${created}`, true)
  .addField(`» Ilość kanałów:`, `${guild.channels.cache.size}`, true)
  .addField(`» Kanał afk:`, guild.afkChannel||"Nie ma", true)
        .addField(`» Aktywni:`, `🟢 -> ${members.filter(member => member.presence.status === 'online').size}\n🔴 -> ${members.filter(member => member.presence.status === 'dnd').size}\n🟠 -> ${members.filter(member => member.presence.status === 'idle').size}\n⚫ -> ${members.filter(member => member.presence.status === 'offline').size}`, true)
    if(guild.afkChannel) exampleEmbed.addField(`» Czas nieaktywności:`, ms(ms(`${guild.afkTimeout}s`)), true);
  exampleEmbed.addField(`» Poziom weryfikacji:`, veryfiaction[guild.verificationLevel], true)
  .setFooter("Skyndalex - serverinfo ")
  .setThumbnail(guild.iconURL({dynamic: true}))
  .setColor("RANDOM") 
message.channel.send(exampleEmbed);
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "serverinfo",
  category: "🛠️ | Narzędzia",
  description: "Pokazuje info o serverze",
  usage: "serverinfo"
};
