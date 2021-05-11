const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
	if (!args[0]) return client.error(message, `Nie podano treści do przegłosowania!`)
	let channel = message.guild.channels.cache.get(client.dbs.prepare(`SELECT voteChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).voteChannel)
	if (!channel) return client.error(message, `Nie ustawiono wartości kanału głosowań w komendzie ustaw!`)
	let text = args.join(' ')
	let embed = new Discord.MessageEmbed()
		.setTitle(`Poddano głosowanie!`)
		.addField(`Przez`, `${message.author.tag}`)
		.addField(`Rzecz do przegłosowania`, text)
		.setColor(`GREEN`)
	channel.send(embed).then(m => {
		m.react('👍')
		m.react('👎')
		m.react('🤷')
	}).catch(err => {
		message.channel.send(`Bot nie mógł wysłać ogłoszenia na kanał\n\`\`\`${err}\`\`\``)
		client.guilds.cache.get('707506586184319036').channels.cache.get('723973152660520980').send(`Jakiś użytkownik spotkał problem korzystając z komendy głosowanie a mianowicie ${err}`)
	})
	client.done(message, `Wysłano głosowanie na kanał`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["głosuj"],
    permLevel: "Moderator"
};

exports.help = {
    name: "glosowanie",
    category: "🛠️ | Narzędzia",
    description: "Organizuje głosowanie",
    usage: "głosowanie <treść>"
};

