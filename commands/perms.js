const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    if (args[0] === "view") {
        let embedPermissions = new Discord.MessageEmbed()
            .setTitle(`Lista permisji`)
            .addField(`\`\`commands.persons.fun\`\``, `4Fun`)
            .addField(`\`\`commands.persons.tools\`\``, `Narzędzia`)
            .addField(`\`\`commands.persons.info\`\``, `Informacje`)
            .addField(`\`\`commands.persons.music\`\``, `Muzyczne`)
            .addField(`\`\`commands.moderation.modtools\`\``, `Moderacja`)
            .addField(`\`\`commands.administration.conf\`\``, `Ustawienia`)
            .addField(`\`\`commands.devs.system\`\``, `Developerskie`)
            .setFooter(`Skyndalex ${client.version}. Permisje w becie.`)
            .setColor(`GREEN`)
        message.channel.send(embedPermissions)
    } else {
        if (args[0] === "add") {
            if (!args[1]) return client.error(message, `Podaj permisję!`)
            let embedPermissionsAdded = new Discord.MessageEmbed()
                .setTitle(`Dodawanie komuś permisji`)
                .setDescription(`Soon:tm:`)
                .setColor(`GREEN`)
            message.channel.send(embedPermissionsAdded)
        } else {
            if (args[0] === "remove") {
                if (!args[1]) return client.error(message, `Podaj permisję!`)
                let embedPermissionsRemoved = new Discord.MessageEmbed()
                    .setTitle(`Zabieranie komuś permisji`)
                    .setDescription(`Soon:tm:`)
                    .setColor(`GREEN`)
                message.channel.send(embedPermissionsRemoved)
            } else {
                if (args[0] === "help") {
                    let embedPermsHelp = new Discord.MessageEmbed()
                        .setTitle(`Pomoc z \`\`perms\`\``)
                        .addField(`\`\`perms remove [użytkownik] [permisja]\`\``, `Zabierz konkretne permisje użytkownikowi`)
                        .addField(`\`\`perms add [użytkownik] [permisja]\`\``, `Dodaj konkretną permisje użytkownikowi`)
                        .addField(`\`\`perms check [permisja]\`\``, `szczegółowe informacje o konkretnej permisji`)
                        .addField(`\`\`perms view\`\``, `Zobacz wszystkie dostępne permisje.`)
                        .addField(`\`\`perms edit [permisja] [remove/add] [użytkownik]\`\``, `Edytuj permisje użytkownikowi`)
                        .setColor(`GREEN`)
                        .setFooter('Wszystkie permisje znajdziesz w komendzie ?perms view.')
                    message.channel.send(embedPermsHelp)
                } else {
                    if (args[0] === "check") {
                        if (!args[1]) return client.error(message, `Podaj permisję!`)
                        let checkedPermsEmbed = new Discord.MessageEmbed()
                        .setTitle(`Sprawdzanie permisji`)
                        .setDescription(`Soon:tm:`)
                        .setColor(`GREEN`)
                        message.channel.send(checkedPermsEmbed)
                    } else {
                        if (args[0] === "edit") {
                            message.channel.send(`test`)
                        } else {
                            let embedHelpPermissions = new Discord.MessageEmbed()
                                .setTitle(`System permisji`)
                                .addField(`\`\`perms view\`\``, `Zobacz dostępne permisje`)
                                .addField(`\`\`perms add\`\``, `Dodaj permisje użytkownikowi`)
                                .addField(`\`\`perms remove\`\``, `Zabierz permisje użytkownikowi`)
                                .addField(`\`\`perms help\`\``, `Uzyskaj więcej pomocy z permisjami.`)
                                .addField(`\`\`perms check\`\``, `Sprawdż permisje`)
                                .addField(`\`\`perms edit\`\``, `Edytuj permisje`)
                                .setColor(`GREEN`)
                                .setFooter(`Skyndalex ${client.version}`)
                            message.channel.send(embedHelpPermissions)
                        }
                    }
                }
            }
        }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Administrator"
};

exports.help = {
    name: "perms",
    category: "🇮 | Informacyjne",
    description: "Skonfiguruj permisje na swoim serwerze",
    usage: "perms"
};
