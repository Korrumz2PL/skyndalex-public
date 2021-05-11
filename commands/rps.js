const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let rpsrandom = ["papier", "kamień", "nożyce"]
    let array = ["papier", "nożyce", "kamień"]
    if(!args[0]) return client.error(message, `Podaj argumenty!\n\`\`kamień, papier, nożyce\`\``)
    if (!array.includes(args[0])) return client.error(message, 'Podano zły argument! Wybierz papier, kamień lub nożyce\nMusisz wpisać z małymi literkami!')
    let rps = rpsrandom.random()
    let embed = new Discord.MessageEmbed()
        .setTitle(`Wyniki`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
        .setDescription(`👤 | Użytkownik: ${message.author.username}\n🎮 | Gra: Papier, kamień, nożyce`)
        .addField('Ty wybrałeś', `${args[0]}`)
        .addField('Ja wybrałem', rps)

if(args[0]==="kamień"&&rps==="papier")        embed.addField(`Wynik`, `Wygrałem ja`)
if(args[0]==="kamień"&&rps==="nożyce")        embed.addField(`Wynik`, `Wygrałeś ty`)
if(args[0]==="kamień"&&rps==="kamień")        embed.addField(`Wynik`, `Remis`)
if(args[0]==="papier"&&rps==="papier")        embed.addField(`Wynik`, `Remis`)
if(args[0]==="papier"&&rps==="nożyce")        embed.addField(`Wynik`, `Wygrałem ja`)
if(args[0]==="papier"&&rps==="kamień")        embed.addField(`Wynik`, `Wygrałeś ty`)
if(args[0]==="nożyce"&&rps==="papier")        embed.addField(`Wynik`, `Wygrałeś ty`)
if(args[0]==="nożyce"&&rps==="nożyce")        embed.addField(`Wynik`, `Remis`)
if(args[0]==="nożyce"&&rps==="kamień")        embed.addField(`Wynik`, `Wygrałem ja`)
        embed.setFooter('Skyndalex - rps')
        .setColor("GREEN")
     message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["papierkamieńnożyce"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "rps",
    category: "🎉 | 4fun",
    description: "Zagraj w papier kamień nożyce!",
    usage: "8ball"
};