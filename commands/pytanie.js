const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]);
    const channel = message.guild.channels.cache.get(client.dbs.prepare("SELECT questionChannel FROM ServerSettings WHERE ID = ?").get(message.guild.id).questionChannel)
    if(!channel) return client.error(message, 'Nie znaleziono kanału')
    if(!args[0]) return client.error(message, `Poprawne użycie:\nprefixpytanie treśćpytania`)
        let embed1 = new Discord.MessageEmbed()
        .setTitle(`Nowe pytanie!`)
        .addField(`Zadał pytanie:`, `${message.author.tag}`)
        .addField(`ID zadającego:`, `${message.author.id}`)
        .addField(`Treść pytania:`, `${args.join(' ')}`)
            .setColor(`GREEN`)
    channel.send(embed1).then(() => {
        let success = new Discord.MessageEmbed()
        .setTitle('Pomyślnie wysłano pytanie')
        .addField(`Treść pytania:`, `${args.join(' ')}`)
            .addField(`Zdjęcia i inne pliki:`, message.attachments.map(a=>`${a.name} -> ${a.url}`).join(` | `)||"Nie przesłano")
        if(message.attachments.map(a=>a.url)[0]) success.setImage(message.attachments.map(a=>a.url)[0])
        if(message.attachments.map(a=>a.url)[0]) success.setFooter('W obrazku pokazane jest tylko jedno pierwsze zdjęcie!');
        success.setColor(`GREEN`)
        message.channel.send(success)
    }).catch(err => {
        client.error(message, `Nastąpił nieoczekiwany błąd!\nBot może nie mieć odpowiednich uprawnień\nSkontaktuj się z administratorami serwera lub twórcami bota (\`help\` na dm z botem)\nTreść błędu: ${err}`)
        client.guilds.cache.get("707506586184319036").channels.cache.get("723973152660520980").send(`Jakiś użytkownik spotkał problem korzystając z komendy pytanie mianowicie ${err}`)
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pyt"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "pytanie",
    category: "🛠️ | Narzędzia",
    description: "Zadaje pytanie do moderacji.",
    usage: "pytanie <kanal> <treść>"
};





