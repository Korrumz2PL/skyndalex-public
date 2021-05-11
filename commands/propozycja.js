const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    let channel = message.guild.channels.cache.get(client.dbs.prepare(`SELECT suggestionsChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).suggestionsChannel)
   if (!channel) return client.error(message `Nie ustawiono kanału do propozycji w komendzie ustaw przez administrację!`)
    if (!args[0]) return client.error(message, `Nie podano treści propozycji!`)
    const Embed = new Discord.MessageEmbed()
    .setTitle(`Nowa propozycja dla serwera!`)
    .addField(`Dawca propozycji`, `${message.author.username}`)
	.addField(`Treść propozycji:`, args.slice(0).join(" "))
    .addField(`Zdjęcia i inne (nazwa pliku -> link do zdjęcia)`, message.attachments.map(a=>`${a.name} -> ${a.url}`).join(` | `)||"Nie przesłano lub wystąpił inny błąd")
    if(message.attachments.map(a=>a.url)[0]) Embed.setImage(message.attachments.map(a=>a.url)[0])
    if(message.attachments.map(a=>a.url)[0]) Embed.setFooter('W obrazku pokazane jest tylko jedno pierwsze zdjęcie!');
    Embed.setColor(`GREEN`)
channel.send(Embed).then(m => {
    m.react('👍')
    m.react('👎')
}).catch(err => {
    message.channel.send(`Bot nie mógł wysłać ogłoszenia na kanał\n\`\`\`${err}\`\`\``)
    client.guilds.cache.get('707506586184319036').channels.cache.get('723973152660520980').send(`Jakiś użytkownik spotkał problem korzystając z komendy propozycja a mianowicie ${err}`)
})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["zaproponuj"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "propozycja",
    category: "🛠️ | Narzędzia",
    description: "Wysyła propozycje",
    usage: "propozycja <treść>"
};

