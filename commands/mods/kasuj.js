exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return client.error(message, `Nie masz permisji! \`\`KICK_MEMBERS\`\``)
    let toDelete = args[0]
    if (args[0] > 99) return client.error(message, `Maksymalną liczbą do skasowania wiadomości jest 99!`)
    if (args[0] < 2) return client.error(message, 'Minimalną liczbą jest 2!')
    if (!args[0]) return client.error(`Nie wpisano liczby wiadomości do skasowania!`)
    if (isNaN(args[0])) return client.error(message, `To, co wpisałeś nie jest liczbą!`)
    message.channel.bulkDelete(toDelete)
    client.done(message, `Usunięto!`, `Pomyślnie usunięto ${args[0]} wiadomości przez ${message.author.tag}`, `Kasowanie wiadomości`, `GREEN`)
};

exports.help = {
    name: "kasuj",
    description: "Usuwanie wiadomości",
    category: "mods",
}