const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
const user = message.mentions.users.first()  || client.users.cache.get(args[0]);
if(!args[0]) return client.error(message, 'Oznacz użytkownika!')
if(user.id===message.author.id) return client.error(message, 'Nie możesz sam siebie zdegradować!')
if(user.id===message.guild.owner.id) return client.error(message, 'Nie możesz dać degrada właścicielowi serwera!')

let embed = new Discord.MessageEmbed()
	.setTitle("Zdegradowano użytkownika!...")
	.setColor("RED")
	.setDescription(`${message.author.username} zdegradował ${user.username}`)
	.addField(`Za`, `${args.slice(1).join(' ')||"Brak powodu"}`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Degrad"],
  permLevel: "Moderator"
};

exports.help = {
  name: "degrad",
  category: "🔨 | Moderacyjne",
  description: "Degraduje użytkownika",
  usage: "degrad"
};





