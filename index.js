const Discord = require('discord.js-light')
const Bot = require("./base/Client.js");
const client = new Bot({
	cacheGuilds: true,
	cacheChannels: true,
	cacheOverwrites: true,
	cacheRoles: true,
	cacheEmojis: true,
	cachePresences: true
})
const fs = require('fs');
const { token } = require('./config.json');
/* rethinkdb
const r = require('rethinkdb')
r.connect({
	host: '52.188.208.180',
	port: 28015,
	db: "skyndalex",
	username: "admin",
	password: "SGVyk4zyZxokja6"
}).then(async conn => {
}).catch(err => {
	console.error(err)
	process.exit(1)
})
//end rethink

 */
client.commands = new Discord.Collection();
client.version = 'v0.1'
require("./functions.js")(client);

fs.readdirSync("./commands/").forEach(dir => {
	const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

	for (let file of commands) {
		let pull = require(`./commands/${dir}/${file}`);
		if (pull.help && pull.help.name) {
			console.log(`Loading command: ${file}`);
			client.commands.set(pull.help.name, pull);
		} else {
			continue;
		}
	}
});


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	const commandName = command.conf.name;
	console.log(`Loading command: ${file}`)
	client.commands.set(commandName, command);
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	const eventName = file.split(".")[0];
	console.log(`Loading event: ${file}`);
	client.on(eventName, event.bind(null, client));
}
client.login(token);