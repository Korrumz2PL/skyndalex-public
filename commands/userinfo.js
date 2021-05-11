const moment = require("moment-timezone");
moment.locale('pl')
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;
    if (!user) return client.error(message, `Nie znaleziono użytkownika!`)
    let created = moment(user.createdAt).tz('Europe/Warsaw').format('LLLL')
    let status = {
    online: "<a:onlinegif:694447153430528020> | Dostępny",
    idle: "<a:idlegif:694447079350599800> | Zaraz wracam",
    dnd: "<a:dndgif:694447104038273114> | Nie przeszkadzać",
    offline: "<a:offlinegif:694447128658837514> | Niedostępny"
}
    const member = message.guild.members.cache.get(user.id)
    let bot = {
    false: "Nie",
    true: "Tak"
    }
    const Embed = new Discord.MessageEmbed()
        Embed.setTitle(`Informacje o koncie ${user.username || message.author.username}`)
        .setDescription(`Poniżej znajdują się informacje o wzmiankowanym użytkowniku`, true)
        .addField(`» Data założenia konta:`, `${created}`, true)
if(member) Embed.addField('» Data dołączenia na serwer', moment(member.joinedAt).tz('Europe/Warsaw').format('LLLL'), true);
        Embed.addField(`» ID użytkownika:`, `${user.id || message.author.id}`, true)
        .addField(`» Nazwa użytkownika:`, `${user.tag || message.author.tag}`, true)
    	.addField(`» Status:`, `${status[user.presence.status]}`, true)
        .addField(`» Czy jest botem?`, `${bot[user.bot]}`, true)
if(member)  Embed.addField('» Role', member.roles.cache.map(r => r.name).join(' | '), true);
        Embed.setFooter(`» Skyndalex - userinfo «`)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setColor("RANDOM");
    message.channel.send(Embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["osobainfo", "osoba", "whois", "user"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "userinfo",
    category: "🛠️ | Narzędzia",
    description: "Pokazuje info o danej osobie.",
    usage: "userinfo [osoba]"
};