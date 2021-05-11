module.exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Podaj emoji`)
    message.channel.send(`${client.emojis.cache.find(x => x.name === args[0]).toString()}`).catch(err => {
        message.channel.send(`\`\`\`${err}\`\`\``)
    })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["najtroemodżis"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "nitroemoji",
    category: "🎉 | 4fun",
    description: "szuka emotki",
    usage: "nitroemoji"
};