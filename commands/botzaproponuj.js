const Discord = require("discord.js");
const repDelay = new Set(); // nowy array
const timeout = 900000; // czas przerwy to 15m

exports.run = async (client, message, args) => {
    //TODO: client.error(message, `Podaj propozycję!`)
 if(repDelay.has(message.author.id)){
            client.error(message, `Poczekaj 15 minut zanim wyślesz kolejną propozycję!`)
 } else
    var today = new Date();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  let kanal = client.channels.cache.get("769857325862617098");


    let tresc = args.join(" ");
  if(!tresc) return client.error(message, `Nie podano propozycji!`)

  let embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
  .setColor("GREEN")
  .setDescription("Wysłano!")
  .setFooter("Spam propozycjami/bezsensowne propozycje grożą gbanem!")

let embed3 = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")
.addField("Wysyłający propozycję:", `${message.author.tag} (ID: ${message.author.id})`)
.addField("Treść propozycji:", `${tresc}`)
kanal.send(embed3);
message.channel.send(embed)


   repDelay.add(message.author.id);
                 setTimeout(async () => {
                        repDelay.delete(message.author.id);
                 }, timeout);
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bug"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "botpropozycja",
    category: "🤖 | Systemowe",
    description: "Po wpisaniu tej komendy zostanie wysłana propozycja na serwer deweloperski. (Link do serwera w komendzie !!pomoc)",
    usage: "botpropozycja <treść>"
};

