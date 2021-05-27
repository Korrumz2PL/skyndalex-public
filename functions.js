const Discord = require("discord.js")
module.exports = (client) => {
	client.loadCommand = (commandName) => {
		try {
			const props = require(`${process.cwd()}/commands/bot${commandName}`);
			if (props.init) {
				props.init(client);
			}
			client.commands.set(props.help.name, props);
			return false;
		} catch (e) {
			return `Unable to load command ${commandName}: ${e}`;
		}
	};
	client.unloadCommand = async (commandName) => {
		const command = client.commands.get(commandName);
		if (!command) return `Komenda \`${commandName}\` nie istnieje! Sprawdź alias i spróbuj ponownie.`;
		if (command.shutdown) {
			await command.shutdown(client);
		}
		client.commands.delete(command.help.name);
		delete require.cache[require.resolve(`${process.cwd()}/commands/${command.help.name}.js`)];
		return false;
	};
}
Object.defineProperty(Array.prototype, "random", {
	value: function () {
		return this[Math.floor(Math.random() * this.length)];
	}
});