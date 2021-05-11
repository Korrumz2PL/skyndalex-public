const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (args[0] > 99) return client.error(message, `Maksymalną liczbą do skasowania wiadomości jest 99!`)
  if (args[0] < 2) return client.error(message, 'Minimalną liczbą jest 2!')
  if (!args[0]) return client.error(`Nie wpisano liczby wiadomości do skasowania!`)
  if (isNaN(args[0])) return client.error(message, `To, co wpisałeś nie jest liczbą!`)
  const liczba = parseInt(args.join(' ')) + 1
  message.channel.bulkDelete(liczba).then(m=>{
  let skasowano = new Discord.MessageEmbed()
      .setTitle(`Skasowano!`)
      .setDescription(`Wykasowano ${m.size} wiadomości przez ${message.author.username}`)
      .setFooter(`Ta wiadomość zniknie za pare sekund.`)
      .setColor(`GREEN`)
  message.channel.send(skasowano).then(m => {
    m.delete({timeout: 10000})
  }).catch(error => {
    message.channel.send(`${err}`)
  })
}).catch(error => {
  message.channel.send(`Nastąpił błąd z kasowaniem:\n${err}`)
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kasuj", "clear"],
  permLevel: "Moderator"
};

exports.help = {
  name: "kasuj",
  category: "🔨 | Moderacyjne",
  description: "Czyści chat.",
  usage: "kasuj <ilość>"
};
