const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
const user = message.mentions.users.first()  || client.users.cache.get(args[0]);
if(!args[0]) return client.error(message, 'Oznacz użytkownika!')
if(user.id===message.author.id) return client.error(message, 'Nie możesz sam siebie awansować!')
if(user.id===message.guild.owner.id) return client.error(message, 'Nie możesz dać awansu właścicielowi serwera!')
let embed = new Discord.MessageEmbed()
	.setTitle("Awansowano użytkownika!...")
	.setColor("GREEN")
	.setDescription(`${message.author.username} Awansował ${user.username}`)
	.addField(`Awansowano na`, `${args.slice(1).join(' ')||"Nie podano na co awansowano"}`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Awans"],
  permLevel: "Moderator"
};

exports.help = {
  name: "awans",
  category: "🔨 | Moderacyjne",
  description: "Awansuje użytkownika",
  usage: "awans"
};




