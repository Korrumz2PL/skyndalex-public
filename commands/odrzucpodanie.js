const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
const user = message.mentions.users.first()  || client.users.cache.get(args[0]);
if(!args[0]) return client.error(message, 'Oznacz użytkownika!')
if(user.id===message.author.id) return client.error(message, 'Nie możesz odrzucić własnego podania!')

let embed = new Discord.MessageEmbed()
	.setTitle("Odrzucono podanie...")
	.setColor("RED")
	.setDescription(`${message.author.username} odrzucił podanie ${user.username}... Niestety`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["odrzuc"],
  permLevel: "Moderator"
};

exports.help = {
  name: "odrzućpodanie",
  category: "🔨 | Moderacyjne",
  description: "Odrzuca podanie użytkownika",
  usage: "odrzućpodanie"
};


