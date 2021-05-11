const Discord = module.require('discord.js');
let liczba = ["1/10", "2/10", "3/10", "4/10", "5/10", "6/10", "7/10", "8/10", "9/10", "10/10"]
let gwiazdka = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"]

module.exports.run = async (bot, message, args) => {
let errorembed = new Discord.MessageEmbed()
	.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
	.setDescription("Co mam ocenic?")
	.setColor("RED")
let ocenembed = new Discord.MessageEmbed()
	.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
	.addField(`Oceniam **${args.join(" ")}** na`, liczba.random())
        .addField(`Gwiazdki`, gwiazdka.random())
	.setColor(`RANDOM`)
if(!args[0]){
  return message.channel.send(errorembed)
}
	
if (args[0]) message.channel.send(ocenembed);
else message.channel.send("Nie byłem w stanie tego przeczytać");

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ocen", "ocenianie", "oceń", "oceńpls"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "oceń",
  category: "🛠️ | Narzędzia",
  description: "Bot ocenia twoją rzecz",
  usage: "ocen"
};
