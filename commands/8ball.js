module.exports.run = async (client, message, args) => {
let odp = ["Tak", "Nie", "tak", "nie", "Moje źródła mówią NIE", "Moje źródła mówią TAK", "Chyba tak", "chyba nie", "Zastanowię się", "Może", "Zapytaj ponownie później"]
  if (!args[0]) return client.error(message, `Nie wpisano pytania!`)
  let q = args.join(' ')
  let reponse = odp.random()
  let embQuestion = new Discord.MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`8ball`)
      .addField(`Pytanie`, `${q}`)
      .addField(`Odpowiedź`, `${reponse}`)
      .addField(`Zadał pytanie`, message.author.tag)
  message.channel.send(embQuestion)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Zadajpytanie", "pytanie", "icomądralo"],
  permLevel: "Użytkownik"
};

exports.help = {
  name: "8ball",
  category: "🎉 | 4fun",
  description: "Bot odpowiada na twoje pytanie",
  usage: "8ball"
};