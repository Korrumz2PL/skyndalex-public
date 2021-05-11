const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    //TODO: command cooldown
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!args[0]) return client.error(message, `Nie oznaczyłeś użytkownika!`)
    if (!user) return client.error(message, `Nie znaleziono użytkownika`)
    if(user.id===message.author.id) return client.error(message, `Użytkownik który rozpoczął walkę zwalczył sam siebie!`)
    if(message.author.id===user.id) return client.error(message, `Użytkownik który rozpoczął walkę zwalczył sam siebie!`)
    let EmbedStart = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} Rozpoczął bitwę!`)
        .setDescription(`Walka pomiędzy <@${user.id}> a <@${message.author.id}>`)
        .setFooter(`Skyndalex ${client.version} || Walki w fazie BETA.`)
        .setColor(`GREEN`)
    message.channel.send(EmbedStart).then(m => {
        setTimeout(function() {
            m.edit(WinnerEmbed);
        }, 1500)
    })
    let winner = [
        `<@${message.author.id}>`,
        `<@${user.id}>`
    ]
    let WinnerEmbed = new Discord.MessageEmbed()
        .setTitle(`Zwyciężył!`)
        .setDescription(`Wygrał: ${winner.random()}`)
        .setColor(`DARK_GREEN`)
        .setFooter(`Skyndalex ${client.version} || system walk`)
        .setThumbnail(`https://static.thenounproject.com/png/2082792-200.png`)
 }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bitwa"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "walka",
    category: "🎉 | 4fun",
    description: "Walcz z użytkownikami",
    usage: "walka"
};
