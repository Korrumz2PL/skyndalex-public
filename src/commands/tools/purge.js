const Discord = require("discord.js");
const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Nie masz permisji")
    if (isNaN(args[0])) return message.channel.send('To, co wpisałeś nie jest liczbą!');
    if (!args[0]) return message.channel.send('Nie wpisano liczby wiadomości do skasowania!');
    if ((args[0] > 99) || (args[0] < 1)) return message.channel.send('Maksymalna liczba wynosi 99, a minimalna to 1!');

    const purgedTo = await message.channel.bulkDelete(args[0]);

    client.sender(message, "", "Usunięto wiadomości.", "", "GREEN", "", "", "")

    const logChannel = await r.table("logs").get(message.guild.id)("clearLog").default(null).run(client.con)
    if (!logChannel) return message.channel.send("Nie ustawiono logów usuwania wiadomości, więc nie jestem w stanie przekierować je na kanał z logami!").then(m => {
        m.delete({timeout: 1000})
    })

    const embedLog = new Discord.MessageEmbed()
    .setTitle("Logi: wyczyszczono wiadomości")
    .addField("Usunięto przez", message.author.tag)
    .setColor("GREEN")
    client.channels.cache.get(logChannel).send(embedLog)
}
exports.help = {
    name: "purge",
    description: "Czyści wiadomości",
    category: "tools",
    aliases: ["czysc", "kasuj"]
}