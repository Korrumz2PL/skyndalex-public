const moment = require("moment");
moment.locale('pl')
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    const channel = message.mentions.channels.first()||message.guild.channels.cache.get(args[0])||message.channel;
    if(!channel) return client.error(message, 'Nie znaleziono kanału')
    let created = moment(channel.createdAt).format("LLLL")
    let type = {
        text: "Tekstowy",
        voice: "Głosowy",
        category: "Kategoria",
        news: "Wiadomości",
        store: "Sklep",
        dm: "Wiadomość prywatna",
        unknown: "Nie wiadomo"
    }
    let tof = {
        true: "Tak",
        false: "Nie"
    }
        let channelname = "kanału"
        let channelnametwo = "kanale"
    if(channel.type==="category") {
         channelname = "kategorii"
         channelnametwo = "kategorii"
    }
    const Embed = new Discord.MessageEmbed()
        .setTitle(`Informacje o ${channelnametwo} ${channel.name}`)
        .setDescription(`Poniżej znajdują się informacje o ${channelnametwo}`, true)
        .addField(`» Data stworzenia ${channelname}:`, `${created}`, true)
        .addField(`» ID ${channelname}:`, `${channel.id}`, true)
        .addField(`» Typ:`, type[channel.type], true)
        .addField(`» Nazwa ${channelname}:`, `${channel.name}`, true)
        if(channel.topic) Embed.addField(`» Temat ${channelname}:`, channel.topic, true);
        Embed.addField(`» Pozycja:`, channel.rawPosition, true);
        if(channel.type!="category"&&channel.type!="voice") Embed.addField(`» Czy jest nsfw:`, tof[channel.nsfw], true);
        if(channel.type==="voice") Embed.addField('» Bitrate', channel.bitrate, true)
      if(channel.type==="voice"&&channel.userLimit>=1) Embed.addField('» Limit użytkowników', channel.userLimit, true)
      if(channel.type==="voice"&&channel.userLimit==0) Embed.addField('» Limit użytkowników', 'Brak', true)
        Embed.setFooter(`» Skyndalex - channelinfo «`)
        .setColor("RANDOM");
    message.channel.send(Embed).catch(err => {
        client.error(message, `${err}`)
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kanal"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "channelinfo",
    category: "🛠️ | Narzędzia",
    description: "Pokazuje info o kanale",
    usage: "channelinfo [kanal]"
};
 