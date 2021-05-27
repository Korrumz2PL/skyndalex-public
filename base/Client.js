const Discord = require("discord.js-light")

class Bot extends Discord.Client {
	constructor(clientOptions) {
		super(clientOptions);
		this.version = 'v0.1';
	}
	async error(message, text, footer = "Błąd", color = "RED") {
		let embedError = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setTitle(`Błąd!`)
			.setDescription(text)
			.setColor(color)
			.setFooter(`${footer} || CobraBot ${this.version}`, this.user.displayAvatarURL())
		return message.channel.send(embedError).catch(err => {
			let embederr = new Discord.MessageEmbed()
				.setDescription(`\`\`\`${err}\`\`\``)
				.setColor(`GREEN`)
			client.guilds.cache.get('783327601753980959').channels.get('785193102960230401').send(embederr)
		})
	}
	async done(message, title, text, footer = "", color = "GREEN") {
		let embedDone = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setTitle(title)
			.setDescription(text)
			.setColor(color)
			.setFooter(`${footer} || CobraBot ${this.version}`, this.user.displayAvatarURL())
		return message.channel.send(embedDone)
	}
}
module.exports = Bot;