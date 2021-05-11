const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
const user = message.mentions.users.first()  || client.users.cache.get(args[0]);
if(!args[0]) return client.error(message, 'Oznacz użytkownika!')
if(user.id===message.author.id) return client.error(message, 'Nie możesz przyjąć swojego podania!')

let embed = new Discord.MessageEmbed()
	.setTitle("Zaakceptowano podanie.")
	.setColor("GREEN")
	.setDescription(`${message.author.username} Zaakceptował podanie ${user.username}! Gratulujemy`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["accept"],
  permLevel: "Moderator"
};

exports.help = {
  name: "przyjmijpodanie",
  category: "🔨 | Moderacyjne",
  description: "Akceptuje podanie użytkownika",
  usage: "przyjmijpodanie"
};

