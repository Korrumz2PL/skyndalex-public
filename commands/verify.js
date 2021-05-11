const discord = require("discord.js")
exports.run = async (client, message, args, level) => {
    const role = message.guild.roles.cache.get(client.dbs.prepare("SELECT verificationRole FROM ServerSettings WHERE ID = ?").get(message.guild.id).verificationRole)
    if (!role) return client.error(message, `Administrator serwera nie ustawił roli w ustawieniach lub wystąpił inny błąd`)
    if(message.member.roles.cache.map(r=>r.id).includes(role.id)) return message.channel.send('Jesteś już zweryfikowany')
    let characters = "abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ0123456789!@#$%^&*()";
let out = "";
for(let i=0; i < 5; i++) {
  out += characters.charAt(Math.floor(Math.random()*characters.length));
}
  const response = await client.awaitReply(message, `Przepisz ten kod aby zostać zweryfikowanym: \`${out}\``);
  if(response.content!=out) return message.channel.send('Niepoprawny kod!')
    message.member.roles.add(role).catch(err=>message.channel.send(`Nastąpił problem! Błąd to: ${err}`))
    client.done(message, `Zweryfikowano użytkownika ${message.author.tag}`).catch(err => {
        client.error(message, `\`\`\`${err}\`\`\``)
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["weryfikuj"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "verify",
    category: "🛠️ | Narzędzia",
    description: "Dzięki tej komendzie możesz zweryfikować się na serweerze, jeżeli administrator włączył weryfikację.",
    usage: "verify"
};