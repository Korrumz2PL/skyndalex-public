const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
   if (!args[0]) return client.error(message, `Nie podano treści ogłoszenia!`)
  let channel = message.guild.channels.cache.get(client.dbs.prepare(`SELECT announcementsChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).announcementsChannel)
  let pingRole = message.guild.roles.cache.get(client.dbs.prepare(`SELECT roleBroadcastPing FROM ServerSettings WHERE ID = ?`).get(message.guild.id).roleBroadcastPing)
  if (!channel) return client.error(message, `Nie ustawiono wartości kanału ogłoszeń w komendzie ustaw!`)
  let embed = new Discord.MessageEmbed()
      .setTitle(`Nowe ogłoszenie!`)
      .setColor(`GREEN`)
      .setDescription(`${args.join(' ')}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
  channel.send(embed).catch(err => {
    message.channel.send(`Bot nie mógł wysłać ogłoszenia na kanał\n\`\`\`${err}\`\`\``)
    client.guilds.cache.get('707506586184319036').channels.cache.get('723973152660520980').send(`Jakiś użytkownik spotkał problem korzystając z komendy oglos a mianowicie ${err}`)
  })
  channel.send(`<@&${pingRole.id}>`).then(m => {
    m.delete({timeout: 3000})
  })
  let embedInfo = new Discord.MessageEmbed()
      .setTitle(`Wysłano ogłoszenie`)
      .addField(`Treść ogłoszenia:`, args.join(' '))
      .setColor(`GREEN`)
  message.channel.send(embedInfo)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ogloszenie", "ogłoś", "ogłoszenie"],
  permLevel: "Moderator"
};

exports.help = {
  name: "oglos",
  category: "🛠️ | Narzędzia",
  description: "Ogłasza coś",
  usage: "oglos"
};

