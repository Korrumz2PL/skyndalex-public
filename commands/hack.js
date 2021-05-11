const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;
    if(!args[0]) return client.error(message, `Oznacz użytkownika!`)
    if(user.id===message.author.id) return client.error(message, 'Nie znaleziono użytkownika, bądź próbowałeś zhackować sam siebie!')
    let passwords = ["YSPD6JNZma", "j5DwZKAyKh", "uhm7Gb3vV4", "rknEoRPBhA", "b25fWvqXtA", "FojrTq2nko", "hTqDAYksvD"]
    let emails = ["hjssk@gmail.com", "kakoap@gmail.com", "aks69@gmail.com", "koksxdlol123@gmail.com", "okgghj@gmail.com"]
    let embed1 = new Discord.MessageEmbed()
        .setTitle(`Zhackowano pomyślnie!`)
        .addField(`Zhackowany użytkownik:`, `${user.username}`)
        .addField(`Hackuje`, `${message.author.tag}`)
        .addField(`Hasło`, passwords.random())
        .addField(`Email:`, emails.random())
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/9/9b/The.Matrix.glmatrix.2.png')
        .setColor(`RED`)
    message.channel.send(embed1)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["hackuj"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "hack",
    category: "🎉 | 4fun",
    description: "Hackuje użytkownika [FAKE]",
    usage: "hack <osoba>"
};