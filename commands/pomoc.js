const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    let command = args[0];
    if (client.commands.get(command) || client.commands.get(client.aliases.get(command)) ) {
      command =
        client.commands.get(command) ||
        client.commands.get(client.aliases.get(command));
 //     if (level < client.levelCache[command.conf.permLevel]) return;
      let emb = new Discord.MessageEmbed()
  .setDescription(`Znajdziesz tu niezbędne informacje o wybranej komendzie!`)
  .setThumbnail(client.user.displayAvatarURL({size: 1024}))
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
        .setTitle(`Szczegółowe informacje o komendzie ${command.help.name.toProperCase()}`)
        .setColor("#9534eb")
        .addField("Opis komendy:", `${command.help.description}`)
        .addField(
          "Aliasy:",
          `${command.conf.aliases.join("**, **") || "Brak."}`
        )
        .addField("Wymagane uprawnienie:", `${command.conf.permLevel}`)
        .addField("Serwerowa?", `${command.conf.guildOnly ? "Tak" : "Nie"}`)
        .addField("Kategoria:", `${command.help.category}`)
        .addField("Użycie:", `${command.help.usage}`)
        .setFooter(`Skyndalex - komendy`, client.user.displayAvatarURL({size: 1024}));
      message.channel.send(emb);
    } else {
    if(args[0]==="moderacja") {
        let commandmoderationembed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setColor(`#faaa0a`)
            .setTitle(`Komendy z kategori moderacja`)
            .setDescription(`> \`\`\`${client.commands.filter(c => c.help.category==="🔨 | Moderacyjne").map(c => c.help.name).join(" | ")||"Brak"}\`\`\``)
            .setFooter('Komendy moderacyjne')
        message.channel.send(commandmoderationembed)
    } else {
            if (args[0] === "devs") {
                let devcommandembed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    .setColor(`#fa160a`)
                    .setTitle(`Wyświetlam listę komend z kategorii deweloperskie`)
                    .setDescription(`> \`\`\`${client.commands.filter(c => c.help.category === "🔴 | Deweloperskie").map(c => c.help.name).join(" | ") || "Brak"}\`\`\``)
                    .setFooter('Komendy deweloperskie')
                message.channel.send(devcommandembed)
            } else {
                if (args[0] === "narzędzia") {
                    let toolcommandembed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                        .setColor(`#fa4e0a`)
                    .setTitle(`Wyświetlam listę komend z kategorii narzędzia`)
                    .setDescription(`> \`\`\`${client.commands.filter(c => c.help.category === "🛠️ | Narzędzia").map(c => c.help.name).join(" | ") || "Brak"}\`\`\``)
                        .setFooter('Narzędzia')
                message.channel.send(toolcommandembed)
            } else {
                    if(args[0] === "4fun") {
                        let funcommandembed = new Discord.MessageEmbed()
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                            .setColor(`#2efa0a`)
                            .setTitle(`Wyświetlam listę komend z kategorii 4Fun`)
                            .setDescription(`> \`\`\`${client.commands.filter(c => c.help.category==="🎉 | 4fun").map(c => c.help.name).join(" | ")||"Brak"}\`\`\``)
                            .setFooter('Komendy 4Fun')
                        message.channel.send(funcommandembed)
                    } else {
                        if(args[0] === "conf") {
                            let configcommandembed = new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                                .setTitle(`Wyświetlam listę komend z kategorii Ustawienia serwerowe`)
                                .setDescription(`> \`\`\`${client.commands.filter(c => c.help.category==="⚙️ | Ustawienia serwerowe").map(c => c.help.name).join(" | ")||"Brak"}\`\`\``)
                                .setFooter('config')
                            message.channel.send(configcommandembed)
                        } else {
                            if(args[0] === "info") {
                                let systemcommandembed = new Discord.MessageEmbed()
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                                    .setColor(`BLUE`)
                                    .setTitle(`Wyświetlam listę komend z kategorii informacyjne`)
                                    .setDescription(`> \`\`\`${client.commands.filter(c => c.help.category === "🇮 | Informacyjne").map(c => c.help.name).join(" | ") || "Brak"}\`\`\``)
                                    message.channel.send(systemcommandembed)
                            } else {
                                if(args[0] === "system") {
                                    let systemcommandembed = new Discord.MessageEmbed()
                                        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                                        .setColor(`BLUE`)
                                        .setTitle(`Wyświetlam liste komend z kategorii systemowe`)
                                        .setDescription(`> \`\`\`${client.commands.filter(c => c.help.category==="🤖 | Systemowe").map(c => c.help.name).join(" | ")||"Brak"}\`\`\``)
                                        .setFooter('Komendy systemowe')
                                    message.channel.send(systemcommandembed)
                                } else {
                                    if(args[0] === "info") {
                                        let infocommandsystem = new Discord.MessageEmbed()
                                            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                                            .setColor(`BLUE`)
                                            .setTitle(`Wyświetlam liste komend z kategorii informacyjne`)
                                            .setDescription(`> \`\`\`${client.commands.filter(c => c.help.category==="🇮 | Informacyjne").map(c => c.help.name).join(" | ")||"Brak"}\`\`\``)
                                            .setFooter('Komendy informacyjne')
                                        message.channel.send(infocommandsystem)
                                    } else {

                                           

                                            let helpmenu = new Discord.MessageEmbed()
                                                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                                                .setColor(`GREEN`)
                                                .setTitle(`Spis komend`)
                                                .setDescription(`Witaj w nowym menu pomocy!\nAby zaproponować coś, lub chcesz zgłosić błąd, napisz \`\`help\`\` u prywatnej wiadomości z botem.\nLinki które przydadzą się w przyszłości:\n**[Zaproszenie bota na serwer](https://discord.com/oauth2/authorize?client_id=707650198305767434&permissions=8&scope=bot) | [support](https://discord.gg/Gk79TPF) | [Strona internetowa](https://skyndalex.tk) | [top.gg](https://top.gg/bot/707650198305767434)**`)
                                                .addField(`🔨 | Moderacyjne`, `\`\`help moderacja\`\``, true)
                                                .addField(`🔴 | Deweloperskie`, `\`\`help devs\`\``, true)
                                                .addField(`🛠️ | Narzędzia`, `\`\`help narzędzia\`\``, true)
                                                .addField(`📪 Systemowe`, `\`\`help system\`\``, true)
                                                .addField(`⚙ | Ustawienia`, `\`\`help conf\`\``, true)
                                                .addField(`🇮 | Informacyjne`, `\`\`help info\`\``, true)
                                                .addField(`🎉 | 4Fun`, `\`\`help 4fun\`\``, true)
                                                .setFooter(`Skyndalex ${client.version} || Spis komend`, client.user.displayAvatarURL())
                                                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                                            message.channel.send(helpmenu).catch(error => {
                                                client.error(message, `\`\`\`${error}\`\`\``)
                                            })

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["help", "h", "halp"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "pomoc",
    category: "🇮 | Informacyjne",
    description: "help",
    usage: "pomoc <kategoria>"
};