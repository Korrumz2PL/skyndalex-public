const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
if(!args[0]) {
message.channel.send('Oznacz użytkownika, którego chcesz zgłosić a następnie napisz powód!')
} else {
const user = message.mentions.users.first()  || client.users.cache.get(args[0]);
if(!user) return client.error(message, 'Podano złego użytkownika')
if(user.id===message.author.id) return client.error(message, 'Nie możesz złożyć skargi sam na siebie')
const Embed = new Discord.MessageEmbed()
    	.setTitle(`Nowa skarga!`)
    	.addField(`» Zgłosił`, `<@${message.author.id}> (ID: ${message.author.id})`)
    	.addField(`» Użytkownik który został zgłoszony:`, `<@${user.id}>(ID: ${user.id})`)
  .addField(`» Powód zgłoszenia:`, args.slice(1).join(" ")||'Nie podano powodu')
  .addField(`» Zdjęcia i inne (nazwa pliku -> link do zdjęcia)`, message.attachments.map(a=>`${a.name} -> ${a.url}`).join(` | `)||"Nie przesłano")
  if(message.attachments.map(a=>a.url)[0]) Embed.setImage(message.attachments.map(a=>a.url)[0])
  if(message.attachments.map(a=>a.url)[0]) Embed.setFooter('W obrazku pokazane jest tylko jedno pierwsze zdjęcie!');
    Embed.setColor(`RED`)
    const EmbedInfo = new Discord.MessageEmbed()
.setTitle('Czy wiesz, że')
.setDescription(`W ${client.dbs.prepare(`SELECT prefix FROM ServerSettings WHERE ID = ?`).get(message.guild.id).prefix}ustaw możesz ustawić kanał do skarg`)
.setFooter('Skyndalex - Ta wiadomości ulegnie samodestrukcji za 10 sekund')
.setColor("RED")
    if(isNaN(message.guild.channels.cache.get(client.dbs.prepare(`SELECT complaintChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).complaintChannel))===true) {
        message.channel.send(Embed)
        message.channel.send(EmbedInfo).then(m => {
          m.delete({timeout: 10000})
        })
      } else {
       message.guild.channels.cache.get(client.dbs.prepare(`SELECT complaintChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).complaintChannel).send(Embed).catch(err => {
        message.channel.send('Bot nie może wysłać wiadomości na kanał lub wystąpił inny błąd')
        client.guilds.cache.get("707506586184319036").channels.cache.get("723973152660520980").send(`Jakiś użytkownik spotkał problem korzystając z komendy skarga a mianowicie ${err}`)
      });
// complaint
}}};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["oskarż"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "skarga",
    category: "🛠️ | Narzędzia",
    description: "Oskarża użytkownika",
    usage: "skarga [osoba]"
};

