const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    // tags
    let minecrafter = client.users.cache.get('484419302200442890')
    let cyber = client.users.cache.get('682572949219180547')
    let korrumz = client.users.cache.get('761094393200640012')
    let aleksio = client.users.cache.get('435029733344804874')
    let xiboon = client.users.cache.get('682582825043492930')
    let bomba = client.users.cache.get('363365720295473154')
    let bobos = client.users.cache.get('664393769088712733')
    let gnuj = client.users.cache.get('444132380119138312')
    let fuckyoy = client.users.cache.get('650463174444843030')
    let lukasz = client.users.cache.get('674979744290439171')
        let infoembed = new Discord.MessageEmbed()
            .setTitle(`Informacje`)
            .setDescription(`Jestem botem stworzonym po to, aby pomagać w rozwoju twojego serwera. Moimi *aktualnymi* developerami to Cyber i Korrumz2.`)
            .addField(`Podziękowania dla:`, `${minecrafter.tag}\n${cyber.tag}\n${korrumz.tag}\n${aleksio.tag}\n${xiboon.tag}\n${bomba.tag}`)
            .addField(`Wspierający`, `${bobos.tag}\n${gnuj.tag}\n${fuckyoy.tag}\n${lukasz.tag}`)
            .setColor(`GREEN`)
    message.channel.send(infoembed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "botinfo",
    category: "🤖 | Systemowe",
    description: "Informacje o bocie",
    usage: "botinfo"
};
