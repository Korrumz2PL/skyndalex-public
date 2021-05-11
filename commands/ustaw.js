const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    if(!args[0]) {
        const tof = {
            true: "Włączone",
            false: "Wyłączone"
        }
        if(!message.member.hasPermission('ADMINISTRATOR')) return client.error(message, `Nie masz permisji!`)
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let reactionsPreparing = new Discord.MessageEmbed()
            .setTitle(`Proszę czekać!`)
            .setDescription(`Trwa ładowanie menu...`)
            .setColor(`BLUE`)
        let rMenu = new Discord.MessageEmbed()
            .setTitle(`Menu ustawień`)
            .setDescription(`Aby ustawić wartość wpisz ustaw [liczba przy rzeczy którą chcesz ustawić] [nowa wartość]\nSzukasz logów? Znajdziesz je w komendzie \`\`ustaw logi\`\`!\n\n🏘️ - Menu główne\n\n👋 - Ustawienia powitań oraz pożegnań\n\n#️⃣ - Ustawienia kanałów\n\n📜 - Ustawienia ról\n\n🌐 - Generalne`)
            .setColor(`GREEN`)
            .setFooter(`Ustawienia serwerowe. Jeżeli znalazłeś problem skontaktuj się z administracją bota za pomocą komendy ticket.`)

        let rolesConfig = new Discord.MessageEmbed()
            .setTitle(`Ustawienia - konfiguracja ról || 📜`)
            .setColor(`GREEN`)
            .addField('\`\`[15]\`\` Rola wyciszonego', message.guild.roles.cache.get(client.dbs.prepare(`SELECT mutedRole FROM ServerSettings WHERE ID = ?`).get(message.guild.id).mutedRole)||"Brak")
            .addField('\`\`[17]\`\` Rola która nie może pisać poddczas lockdownu', message.guild.roles.cache.get(client.dbs.prepare(`SELECT SlowmodeChannelOn FROM ServerSettings WHERE ID =?`).get(message.guild.id).SlowmodeChannelOn)||"Brak")
            .addField(`\`\`[18]\`\` Rola zweryfikowanego`, message.guild.roles.cache.get(client.dbs.prepare(`SELECT verificationRole FROM ServerSettings WHERE ID =?`).get(message.guild.id).verificationRole)||"Brak")
            .addField('\`\`[14]\`\` Rola voicemute', message.guild.roles.cache.get(client.dbs.prepare(`SELECT mutedVoiceRole FROM ServerSettings WHERE ID = ?`).get(message.guild.id).mutedVoiceRole)||"Brak")
            .addField('\`\`[19]\`\` Rola do powiadomień', message.guild.roles.cache.get(client.dbs.prepare(`SELECT roleBroadcastPing FROM ServerSettings WHERE ID = ?`).get(message.guild.id).roleBroadcastPing)||"Brak")
        let channelsConfig = new Discord.MessageEmbed()
            .setTitle(`Ustawienia - konfiguracja kanałów || #️⃣`)
            .setColor(`GREEN`)
            .addField('\`\`[11]\`\` Kanał skarg', message.guild.channels.cache.get(client.dbs.prepare(`SELECT complaintChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).complaintChannel)||"Brak")
            .addField('\`\`[12]\`\` Kanał pytań', message.guild.channels.cache.get(client.dbs.prepare(`SELECT questionChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).questionChannel)||"Brak")
            .addField('\`\`[16]\`\` Kanał z komentarzami propozycji', message.guild.channels.cache.get(client.dbs.prepare(`SELECT commentChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).commentChannel)||"Brak")
            .addField('\`\`[8]\`\` Kanał ogłoszeń', message.guild.channels.cache.get(client.dbs.prepare(`SELECT announcementsChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).announcementsChannel) || "Brak")
            .addField('\`\`[9]\`\` Kanał propozycji', message.guild.channels.cache.get(client.dbs.prepare(`SELECT suggestionsChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).suggestionsChannel) || "Brak")
            .addField('\`\`[10]\`\` Kanał głosowań', message.guild.channels.cache.get(client.dbs.prepare(`SELECT voteChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).voteChannel)||"Brak")
            .addField('\`\`[13]\`\` Kanał serwerowych ticketów', message.guild.channels.cache.get(client.dbs.prepare(`SELECT ticketChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).ticketChannel)||"Brak")
            .addField('\`\`[20]\`\` Kanał serwerowych aktualizacji', message.guild.channels.cache.get(client.dbs.prepare(`SELECT serverUpdatesChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).serverUpdatesChannel)||"Brak")
            .addField('\`\`[21]\`\` Kanał z podaniami', message.guild.channels.cache.get(client.dbs.prepare(`SELECT passChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).passChannel)||"Brak")
        let welcomingLeavingConfig = new Discord.MessageEmbed()
            .setTitle(`Ustawienia - konfiguracja powitań i pożegnań || 👋`)
            .setColor(`GREEN`)
            .addField('\`\`[2]\`\` Status powitań', tof[client.dbs.prepare(`SELECT welcomeEnabled FROM ServerSettings WHERE ID = ?`).get(message.guild.id).welcomeEnabled])
            .addField('\`\`[3]\`\`Tekst powitań', client.dbs.prepare(`SELECT welcomeMessage FROM ServerSettings WHERE ID = ?`).get(message.guild.id).welcomeMessage || "Brak")
            .addField('\`\`[4]\`\` Kanał powitań', message.guild.channels.cache.get(client.dbs.prepare(`SELECT welcomeChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).welcomeChannel) || "Brak")
            .addField('\`\`[5]\`\` Status pożegnań', tof[client.dbs.prepare(`SELECT goodbyeEnabled FROM ServerSettings WHERE ID = ?`).get(message.guild.id).goodbyeEnabled])
            .addField('\`\`[7]\`\` Kanał pożegnań ', message.guild.channels.cache.get(client.dbs.prepare(`SELECT goodbyeChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).goodbyeChannel) || "Brak")
            .addField('\`\`[6]\`\` Tekst pożegnań', client.dbs.prepare(`SELECT goodbyeMessage FROM ServerSettings WHERE ID = ?`).get(message.guild.id).goodbyeMessage || "Brak")
        let generalConfig = new Discord.MessageEmbed()
            .setTitle(`Ustawienia - generalne || 🌐`)
            .setColor(`GREEN`)
            .addField('\`\`[1]\`\` Prefix', client.dbs.prepare(`SELECT prefix FROM ServerSettings WHERE ID = ?`).get(message.guild.id).prefix)
        message.channel.send(reactionsPreparing).then(m => {
            m.react('🏘️')
            m.react('👋')
            m.react('#️⃣')
            m.react('🌐')
            m.react('📜').then(() => m.edit(rMenu))
            const filter = (reaction, user) => {
                return ['🏘️', '👋', '#️⃣', '📜', '🌐'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            const collector = m.createReactionCollector(filter, {time: 60000 })
            collector.on('end', () => {
                m.reactions.removeAll()
            })
            collector.on('collect', reaction => {
                if (reaction.emoji.name === '🏘️') {
                    m.edit(rMenu)
                } else if (reaction.emoji.name === '👋') {
                    m.edit(welcomingLeavingConfig)
                } else if (reaction.emoji.name === '#️⃣') {
                    m.edit(channelsConfig)
                } else if (reaction.emoji.name === '📜') {
                    m.edit(rolesConfig)
                } else if (reaction.emoji.name === '🌐') {
                    m.edit(generalConfig)
                }
                reaction.users.remove(message.author.id)
            })
        })
    } else {
        if (args[0] === "zmienne") {
            let embed = new Discord.MessageEmbed()
                .setTitle('Ustaw - zmienne')
                .setFooter(`Skyndalex ${client.version}`)
                .setColor("GREEN")
                .setDescription("Te zmienne wykorzystaj w tekście powitań i pożegnań")
                .addField("{{user}}", "Nazwa oraz tag użytkownika np. Użytkownik#1234", true)
                .addField("{{mention}}", "Wzmianka użytkownika np. @Użytkownik#1234")
                .addField("{{nickname}}", "Nazwa użytkownika np. Użytkownik", true)
                .addField("{{id}}", "ID użytkownika np. 123456789012345678")
                .addField("{{czlonkowie}}", "Ilość członków serwera np. 20", true)
            message.channel.send(embed)
        } else {
            if (args[0] === "logi") {
                if (!args[1]) {
                    const tof = {
                        true: "Włączone",
                        false: "Wyłączone",
                        null: "Wyłączone"
                    }
                    if(!message.member.hasPermission('ADMINISTRATOR')) return client.error(message, `Nie masz permisji!`)
                    let reactionsPreparingLogsEmbed = new Discord.MessageEmbed()
                        .setTitle(`Czekaj!`)
                        .setDescription(`Trwa ładowaniu menu z ustawieniami logów.`)
                        .setColor(`BLUE`)
                    let rMenuLogs = new Discord.MessageEmbed()
                        .setTitle(`Ustawienia logów`)
                        .setColor(`GREEN`)
                        .setDescription(`Ustawienia logów\nAby ustawić wartość wpisz komendę: \`\`ustaw logi [numer] [true/false]\`\`\n\n🏠 - Ta wiadomość\n⭐ - Ustawienia logów ogólne\n🔨 - logi moderacyjne\n📬 - Logi wiadomości\n📰 - Logi serwera\n📜 - logi ról\n👤 - logi użytkowników`)
                    let logsGeneralEmbed = new Discord.MessageEmbed()
                        .setTitle(`Ustawienia logów - ogólne || ⭐`)
                        .setColor(`GREEN`)
                        .addField('Kanał logów - 2', message.guild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsChannel) || "Brak")
                        .addField('Status logów (ogólnie) - 1', tof[client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsEnabled])
                    let logsModerationEmbed = new Discord.MessageEmbed()
                        .setTitle(`Ustawienia logów - moderacja || 🔨`)
                        .setColor(`GREEN`)
                        .addField('Logi przy banowaniu użytkownika - 19', tof[client.dbs.prepare(`SELECT logsUserBan FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsUserBan])
                        .addField('Logi przy odbanowywaniu użytkownika - 20', tof[client.dbs.prepare(`SELECT logsUserUnban FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsUserUnban])
                        .addField('Logi przy banowaniu użytkownika przez skyndalex - 23', tof[client.dbs.prepare(`SELECT logsBanUserSky FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsBanUserSky])
                        .addField('Logi przy wyrzucaniu użytkownika przez skyndalex- 24', tof[client.dbs.prepare(`SELECT logsKickUserSky FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsKickUserSky])
                    let logsMessagesEmbed = new Discord.MessageEmbed()
                        .setTitle(`Ustawienia logów - logi wiadomości || 📬`)
                        .setColor(`GREEN`)
                        .addField('Logi przy masowym usuwaniu wiadmości - 21', tof[client.dbs.prepare(`SELECT logsBulkDelete FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsBulkDelete])
                        .addField('Logi przy usuwaniu wiadomości - 3', tof[client.dbs.prepare(`SELECT logsDeleteMessage FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsDeleteMessage])
                        .addField('Logi przy edycji wiadomości - 4', tof[client.dbs.prepare(`SELECT logsEditMessage FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsEditMessage])
                    let logsServerEmbed = new Discord.MessageEmbed()
                        .setTitle(`Ustawienia logów - logi serwera || 📰`)
                        .setColor(`GREEN`)
                        .addField('Logi przy usuwaniu zaproszenia - 17', tof[client.dbs.prepare(`SELECT logsInviteDelete FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsInviteDelete])
                        .addField('Logi przy tworzeniu zaproszenia - 18', tof[client.dbs.prepare(`SELECT logsInviteCreate FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsInviteCreate])
                        .addField('Logi przy edytowaniu serwera - 13', tof[client.dbs.prepare(`SELECT logsGuildeUpdate FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsGuildeUpdate])
                        .addField('Logi przy tworzeniu emotki - 14', tof[client.dbs.prepare(`SELECT logsEmojiCreate FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsEmojiCreate])
                        .addField('Logi przy edytowaniu emotki - 15', tof[client.dbs.prepare(`SELECT logsEmojiUpdate FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsEmojiUpdate])
                        .addField('Logi przy usuwaniu emotki - 16', tof[client.dbs.prepare(`SELECT logsEmojiDelete FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsEmojiDelete])
                        .addField('Logi przy tworzeniu kanału/kategorii - 5', tof[client.dbs.prepare(`SELECT logsChannelCreate FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsChannelCreate])
                        .addField('Logi przy usuwaniu kanału/kategorii - 6', tof[client.dbs.prepare(`SELECT logsChannelDelete FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsChannelDelete])
                    let logsRolesEmbed = new Discord.MessageEmbed()
                        .setTitle(`Ustawienia logów - logi ról || 📜`)
                        .setColor(`GREEN`)
                        .addField('Logi przy tworzeniu roli - 10', tof[client.dbs.prepare(`SELECT logsRoleCreate FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsRoleCreate])
                        .addField('Logi przy usuwaniu roli - 11', tof[client.dbs.prepare(`SELECT logsRoleDelete FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsRoleDelete])
                        .addField('Logi przy edytowaniu roli - 12', tof[client.dbs.prepare(`SELECT logsRoleEdit FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsRoleEdit])
                        .addField('Logi przy zmianie ról użytkownika - 8', tof[client.dbs.prepare(`SELECT logsMemberRolesUpdate FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsMemberRolesUpdate])
                    let logsPersonEmbed = new Discord.MessageEmbed()
                        .setTitle(`Ustawienia logów - logi użytkowników || 👤`)
                        .setColor(`GREEN`)
                        .addField('Logi przy zmianie pseudonimu użytkownika - 7', tof[client.dbs.prepare(`SELECT logsMemberUpdate FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsMemberUpdate])
                        .addField('Logi przy zmianie ról użytkownika - 8', tof[client.dbs.prepare(`SELECT logsMemberRolesUpdate FROM ServerSettings WHERE ID = ?`).get(message.guild.id).logsMemberRolesUpdate])
                    message.channel.send(reactionsPreparingLogsEmbed).then(m => {
                        m.react('🏠')
                        m.react('⭐')
                        m.react('🔨')
                        m.react('📬')
                        m.react('📰')
                        m.react('📜')
                        m.react('👤').then(() => m.edit(rMenuLogs))
                        const filter = (reaction, user) => {
                            return ['🏠', '⭐', '🔨', '📬', '📰', '📜', '👤'].includes(reaction.emoji.name) && user.id === message.author.id;
                        };
                        const collector = m.createReactionCollector(filter, {time: 60000 })
                        collector.on('end', () => {
                            m.reactions.removeAll()
                        })
                        collector.on('collect', reaction => {
                            if (reaction.emoji.name === '🏠') {
                                m.edit(rMenuLogs)
                            } else if (reaction.emoji.name === '⭐') {
                                m.edit(logsGeneralEmbed)
                            } else if (reaction.emoji.name === '🔨') {
                                m.edit(logsModerationEmbed)
                            } else if (reaction.emoji.name === '📬') {
                                m.edit(logsMessagesEmbed)
                            } else if (reaction.emoji.name === '📰') {
                                m.edit(logsServerEmbed)
                            } else if (reaction.emoji.name === '📜') {
                                m.edit(logsRolesEmbed)
                            } else if (reaction.emoji.name === '👤') {
                                m.edit(logsPersonEmbed)
                            }
                            reaction.users.remove(message.author.id)
                        })
                    })
                } else {
                    if (args[1] === "1") {
                        if (args[2] === "false" || args[2] === "true") {
                            let tof = {
                                false: "wyłączone",
                                true: "włączone"
                            }
                            client.writeSettings(message, 'logsEnabled', args[2])
                            message.channel.send(`Logi (ogólnie) są od teraz ${tof[args[2]]}`)
                        } else {
                            message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                        }
                    } else {
                        if (args[1] === "2") {
                            let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[2].toLowerCase())) || message.guild.channels.cache.get(args[2]) || message.mentions.channels.first()
                            let err = isNaN(channel)
                            if (err === true) return message.channel.send('Nie znalazłem tego kanału')
                            if (channel.type === "voice") return message.channel.send('Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                            if (channel.type === "category") return message.channel.send('Podano kategorię! Musisz podać kanał tekstowy')
                            client.writeSettings(message, 'logsChannel', channel.id)
                            message.channel.send(`Kanał logów ustawiono na <#${channel.id}>`)
                        } else {
                            if (args[1] === "3") {
                                if (args[2] === "false" || args[2] === "true") {
                                    let tof = {
                                        false: "wyłączone",
                                        true: "włączone"
                                    }
                                    client.writeSettings(message, 'logsDeleteMessage', args[2])
                                    message.channel.send(`Logi usuwania wiadomości są od teraz ${tof[args[2]]}`)
                                } else {
                                    message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                }
                            } else {
                                if (args[1] === "4") {
                                    if (args[2] === "false" || args[2] === "true") {
                                        let tof = {
                                            false: "wyłączone",
                                            true: "włączone"
                                        }
                                        client.writeSettings(message, 'logsEditMessage', args[2])
                                        message.channel.send(`Logi edytowania wiadomości są od teraz ${tof[args[2]]}`)
                                    } else {
                                        message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                    }
                                } else {
                                    if (args[1] === "5") {
                                        if (args[2] === "false" || args[2] === "true") {
                                            let tof = {
                                                false: "wyłączone",
                                                true: "włączone"
                                            }
                                            client.writeSettings(message, 'logsChannelCreate', args[2])
                                            message.channel.send(`Logi tworzenia kanału/kategorii są od teraz ${tof[args[2]]}`)
                                        } else {
                                            message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                        }
                                    } else {
                                        if (args[1] === "6") {
                                            if (args[2] === "false" || args[2] === "true") {
                                                let tof = {
                                                    false: "wyłączone",
                                                    true: "włączone"
                                                }
                                                client.writeSettings(message, 'logsChannelDelete', args[2])
                                                message.channel.send(`Logi usuwania kanału/kategorii są od teraz ${tof[args[2]]}`)
                                            } else {
                                                message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                            }
                                        } else {
                                            if (args[1] === "7") {
                                                if (args[2] === "false" || args[2] === "true") {
                                                    let tof = {
                                                        false: "wyłączone",
                                                        true: "włączone"
                                                    }
                                                    client.writeSettings(message, 'logsMemberUpdate', args[2])
                                                    message.channel.send(`Logi przy zmianie pseudonimu użytkownika są od teraz ${tof[args[2]]}`)
                                                } else {
                                                    message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                }
                                            } else {
                                                if (args[1] === "8") {
                                                    if (args[2] === "false" || args[2] === "true") {
                                                        let tof = {
                                                            false: "wyłączone",
                                                            true: "włączone"
                                                        }
                                                        client.writeSettings(message, 'logsMemberRolesUpdate', args[2])
                                                        message.channel.send(`Logi przy zmianie ról użytkownika są od teraz ${tof[args[2]]}`)
                                                    } else {
                                                        message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                    }

                                                } else {
                                                    if (args[1] === "9") {
                                                        if (args[2] === "false" || args[2] === "true") {
                                                            let tof = {
                                                                false: "wyłączone",
                                                                true: "włączone"
                                                            }
                                                            client.writeSettings(message, 'logsChannelEdit', args[2])
                                                            message.channel.send(`Logi przy edycji kanału/kategorii są od teraz ${tof[args[2]]}`)
                                                        } else {
                                                            message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                        }
                                                    } else {
                                                        if (args[1] === "10") {
                                                            if (args[2] === "false" || args[2] === "true") {
                                                                let tof = {
                                                                    false: "wyłączone",
                                                                    true: "włączone"
                                                                }
                                                                client.writeSettings(message, 'logsRoleCreate', args[2])
                                                                message.channel.send(`Logi przy tworzeniu roli są od teraz ${tof[args[2]]}`)
                                                            } else {
                                                                message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                            }

                                                        } else {
                                                            if (args[1] === "11") {
                                                                if (args[2] === "false" || args[2] === "true") {
                                                                    let tof = {
                                                                        false: "wyłączone",
                                                                        true: "włączone"
                                                                    }
                                                                    client.writeSettings(message, 'logsRoleDelete', args[2])
                                                                    message.channel.send(`Logi przy usuwaniu roli są od teraz ${tof[args[2]]}`)
                                                                } else {
                                                                    message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                }
                                                            } else {
                                                                if (args[1] === "12") {
                                                                    if (args[2] === "false" || args[2] === "true") {
                                                                        let tof = {
                                                                            false: "wyłączone",
                                                                            true: "włączone"
                                                                        }
                                                                        client.writeSettings(message, 'logsRoleEdit', args[2])
                                                                        message.channel.send(`Logi przy edytowaniu roli są od teraz ${tof[args[2]]}`)
                                                                    } else {
                                                                        message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                    }
                                                                } else {
                                                                    if (args[1] === "13") {
                                                                        if (args[2] === "false" || args[2] === "true") {
                                                                            let tof = {
                                                                                false: "wyłączone",
                                                                                true: "włączone"
                                                                            }
                                                                            client.writeSettings(message, 'logsGuildeUpdate', args[2])
                                                                            message.channel.send(`Logi przy edytowaniu serwera są od teraz ${tof[args[2]]}`)
                                                                        } else {
                                                                            message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                        }
                                                                    } else {
                                                                        if (args[1] === "14") {
                                                                            if (args[2] === "false" || args[2] === "true") {
                                                                                let tof = {
                                                                                    false: "wyłączone",
                                                                                    true: "włączone"
                                                                                }
                                                                                client.writeSettings(message, 'logsEmojiCreate', args[2])
                                                                                message.channel.send(`Logi przy tworzeniu emotki są od teraz ${tof[args[2]]}`)
                                                                            } else {
                                                                                message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                            }
                                                                        } else {
                                                                            if (args[1] === "15") {
                                                                                if (args[2] === "false" || args[2] === "true") {
                                                                                    let tof = {
                                                                                        false: "wyłączone",
                                                                                        true: "włączone"
                                                                                    }
                                                                                    client.writeSettings(message, 'logsEmojiUpdate', args[2])
                                                                                    message.channel.send(`Logi przy edytowaniu emotki są od teraz ${tof[args[2]]}`)
                                                                                } else {
                                                                                    message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                                }
                                                                            } else {
                                                                                if (args[1] === "16") {
                                                                                    if (args[2] === "false" || args[2] === "true") {
                                                                                        let tof = {
                                                                                            false: "wyłączone",
                                                                                            true: "włączone"
                                                                                        }
                                                                                        client.writeSettings(message, 'logsEmojiDelete', args[2])
                                                                                        message.channel.send(`Logi przy usuwaniu emotki są od teraz ${tof[args[2]]}`)
                                                                                    } else {
                                                                                        message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                                    }
                                                                                } else {
                                                                                    if (args[1] === "17") {
                                                                                        if (args[2] === "false" || args[2] === "true") {
                                                                                            let tof = {
                                                                                                false: "wyłączone",
                                                                                                true: "włączone"
                                                                                            }
                                                                                            client.writeSettings(message, 'logsInviteDelete', args[2])
                                                                                            message.channel.send(`Logi przy usuwaniu zaproszenia są od teraz ${tof[args[2]]}\nUWAGA! Bot wymaga uprawnienia \`Zarządzanie serwerem\` aby mógł wiedzieć czy zaproszenie jest usuwane`)
                                                                                        } else {
                                                                                            message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                                        }
                                                                                    } else {
                                                                                        if (args[1] === "18") {
                                                                                            if (args[2] === "false" || args[2] === "true") {
                                                                                                let tof = {
                                                                                                    false: "wyłączone",
                                                                                                    true: "włączone"
                                                                                                }
                                                                                                client.writeSettings(message, 'logsInviteCreate', args[2])
                                                                                                message.channel.send(`Logi przy tworzeniu zaproszeń są od teraz ${tof[args[2]]}\nUWAGA! Bot wymaga uprawnienia \`Zarządzanie serwerem\` aby mógł wiedzieć czy zaproszenie jest tworzone`)
                                                                                            } else {
                                                                                                message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                                            }
                                                                                        } else {
                                                                                            if (args[1] === "19") {
                                                                                                if (args[2] === "false" || args[2] === "true") {
                                                                                                    let tof = {
                                                                                                        false: "wyłączone",
                                                                                                        true: "włączone"
                                                                                                    }
                                                                                                    client.writeSettings(message, 'logsUserBan', args[2])
                                                                                                    message.channel.send(`Logi przy banowaniu użytkownika są od teraz ${tof[args[2]]}`)
                                                                                                } else {
                                                                                                    message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                                                }
                                                                                            } else {
                                                                                                if (args[1] === "20") {
                                                                                                    if (args[2] === "false" || args[2] === "true") {
                                                                                                        let tof = {
                                                                                                            false: "wyłączone",
                                                                                                            true: "włączone"
                                                                                                        }
                                                                                                        client.writeSettings(message, 'logsUserUnban', args[2])
                                                                                                        message.channel.send(`Logi przy odbanowywaniu użytkownika są od teraz ${tof[args[2]]}`)
                                                                                                    } else {
                                                                                                        message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                                                    }
                                                                                                } else {
                                                                                                    if (args[1] === "21") {
                                                                                                        if (args[2] === "false" || args[2] === "true") {
                                                                                                            let tof = {
                                                                                                                false: "wyłączone",
                                                                                                                true: "włączone"
                                                                                                            }
                                                                                                            client.writeSettings(message, 'logsBulkDelete', args[2])
                                                                                                            message.channel.send(`Logi przy masowym usuwaniu wiadomości są od teraz ${tof[args[2]]}`)
                                                                                                        } else {
                                                                                                            message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                                                        }
                                                                                                    } else {
                                                                                                        if (args[1] === "22") {
                                                                                                            if (args[2] === "false" || args[2] === "true") {
                                                                                                                let tof = {
                                                                                                                    false: "wyłączone",
                                                                                                                    true: "włączone"
                                                                                                                }
                                                                                                                client.writeSettings(message, 'logsWarnUser', args[2])
                                                                                                                message.channel.send(`Logi przy warnowaniu użytkownika są od teraz ${tof[args[2]]}`)
                                                                                                            } else {
                                                                                                                message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                                                            }
                                                                                                        } else {
                                                                                                            if(args[1]==="23") {
                                                                                                                if (args[2] === "false" || args[2] === "true") {
                                                                                                                    let tof = {
                                                                                                                        false: "wyłączone",
                                                                                                                        true: "włączone"
                                                                                                                    }
                                                                                                                    client.writeSettings(message, 'logsBanUserSky', args[2])
                                                                                                                    message.channel.send(`Logi przy banowaniu użytkownika przez skyndalex są od teraz ${tof[args[2]]}`)
                                                                                                                } else {
                                                                                                                    message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                                                                }
                                                                                                            } else {
                                                                                                                if(args[1]==="24") {
                                                                                                                    if (args[2] === "false" || args[2] === "true") {
                                                                                                                        let tof = {
                                                                                                                            false: "wyłączone",
                                                                                                                            true: "włączone"
                                                                                                                        }
                                                                                                                        client.writeSettings(message, 'logsKickUserSky', args[2])
                                                                                                                        message.channel.send(`Logi przy wyrzucaniu użytkownika przez skyndalex są od teraz ${tof[args[2]]}`)
                                                                                                                    } else {
                                                                                                                        message.channel.send('Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                                                                                                    }
                                                                                                                } else {
                                                                                                                    // logsBanUserSky i logsKickUserSky
                                                                                                                    message.channel.send('Musisz podać odpowiedni numer')
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (!args[1]) return client.error(message, 'Wpisz co mam ustawić')
                if (args[0] === "1") {
                    client.writeSettings(message, 'prefix', args[1])
                    let embedPrefixConfig = new Discord.MessageEmbed()
                        .setTitle(`Ustawiono - prefix`)
                        .addField(`Nowa wartość`, args[1])
                        .setColor(`GREEN`)
                    message.channel.send(embedPrefixConfig)
                    // args.slice(1)
                } else {
                    if (args[0] === "2") {
                        if (args[1] === "false" || args[1] === "true") {
                            let tof = {
                                false: "wyłączone",
                                true: "włączone"
                            }
                            client.writeSettings(message, 'welcomeEnabled', args[1])
                            client.done(message, `Powitania są od teraz ${tof[args[1]]}`)
                        } else {
                            client.error(message, 'Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                        }
                    } else {
                        if (args[0] === "3") {
                            client.writeSettings(message, 'welcomeMessage', args.slice(1).join(' '))
                            client.done(message, `Tekst powitań ustawiono na ${args.slice(1).join(' ')}`)
                        } else {
                            if (args[0] === "4") {
                                let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                let err = isNaN(channel)
                                if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                client.writeSettings(message, 'welcomeChannel', channel.id)
                                let configWelcomeChannel = new Discord.MessageEmbed()
                                    .setTitle(`Ustawiono - powitania`)
                                    .addField(`Nowa wartość`, `<#${channel.id}>`)
                                    .setColor(`GREEN`)
                                message.channel.send(configWelcomeChannel)
                            } else {
                                if (args[0] === "5") {
                                    if (args[1] === "false" || args[1] === "true") {
                                        let tof = {
                                            false: "wyłączone",
                                            true: "włączone"
                                        }
                                        client.writeSettings(message, 'goodbyeEnabled', args[1])
                                        client.done(message, `Pożegnania są od teraz ${tof[args[1]]}`)
                                    } else {
                                        client.erorr(message, 'Musisz podać `true` (włączanie) lub `false` (wyłączanie)')
                                    }
                                } else {
                                    if (args[0] === "6") {
                                        client.writeSettings(message, 'goodbyeMessage', args.slice(1).join(' '))
                                        let configTextGoodbyeEmbed = new Discord.MessageEmbed()
                                            .setTitle(`Ustawiono - tekst pożegnań`)
                                            .addField(`Nowa wartość`, `${args.slice(1).join(' ')}`)
                                            .setColor(`GREEN`)
                                        message.channel.send(configTextGoodbyeEmbed)
                                    } else {
                                        if (args[0] === "7") {
                                            let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                            let err = isNaN(channel)
                                            if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                            if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                            if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                            client.writeSettings(message, 'goodbyeChannel', channel.id)
                                            let configChannelGoodbye = new Discord.MessageEmbed()
                                                .setTitle(`Ustawiono - kanał pożegnań`)
                                                .addField(`Nowa wartość`, `<#${channel.id}>`)
                                                .setColor(`GREEN`)
                                            message.channel.send(configChannelGoodbye)
                                        } else {
                                            if (args[0] === "8") {
                                                let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                                let err = isNaN(channel)
                                                if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                                if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                                if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                                client.writeSettings(message, 'announcementsChannel', channel.id)
                                                let configChannelBroadcast = new Discord.MessageEmbed()
                                                    .setTitle(`Ustawiono - kanał ogłoszeń`)
                                                    .addField(`Nowa wartość`, `<#${channel.id}>`)
                                                    .setColor(`GREEN`)
                                                message.channel.send(configChannelBroadcast)
                                            } else {
                                                if (args[0] === "9") {
                                                    let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                                    let err = isNaN(channel)
                                                    if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                                    if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                                    if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                                    client.writeSettings(message, 'suggestionsChannel', channel.id)
                                                    let suggestionChannelConfigEmbed = new Discord.MessageEmbed()
                                                        .setTitle(`Ustawiono - kanał propozycji`)
                                                        .addField(`Nowa wartość`, `<#${channel.id}>`)
                                                        .setColor(`GREEN`)
                                                    message.channel.send(suggestionChannelConfigEmbed)
                                                } else {
                                                    if (args[0] === "10") {
                                                        let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                                        let err = isNaN(channel)
                                                        if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                                        if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                                        if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                                        client.writeSettings(message, 'voteChannel', channel.id)
                                                        let voteChannelConfigEmbed = new Discord.MessageEmbed()
                                                            .setTitle(`Ustawiono - kanał głosowań`)
                                                            .addField(`Nowa wartość`, `<#${channel.id}>`)
                                                            .setColor(`GREEN`)
                                                        message.channel.send(voteChannelConfigEmbed)
                                                    } else {
                                                        if (args[0] === "11") {
                                                            let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                                            let err = isNaN(channel)
                                                            if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                                            if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                                            if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                                            client.writeSettings(message, 'complaintChannel', channel.id)
                                                            let complaintChannelConfigEmbed = new Discord.MessageEmbed()
                                                                .setTitle(`Ustawiono - kanał skarg`)
                                                                .addField(`Nowa wartość`, `<#${channel.id}>`)
                                                                .setColor(`GREEN`)
                                                            message.channel.send(complaintChannelConfigEmbed)
                                                        } else {
                                                            if (args[0] === "12") {
                                                                let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                                                let err = isNaN(channel)
                                                                if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                                                if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                                                if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                                                client.writeSettings(message, 'questionChannel', channel.id)
                                                                let questionChannelConfigEmbed = new Discord.MessageEmbed()
                                                                    .setTitle(`Ustawiono - kanał pytań`)
                                                                    .addField(`Nowa wartość`, `<#${channel.id}>`)
                                                                    .setColor(`GREEN`)
                                                                message.channel.send(questionChannelConfigEmbed)
                                                            } else {
                                                                if (args[0] === "13") {
                                                                    let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                                                    let err = isNaN(channel)
                                                                    if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                                                    if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                                                    if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                                                    client.writeSettings(message, 'ticketChannel', channel.id)
                                                                    let ticketChannelConfigEmbed = new Discord.MessageEmbed()
                                                                        .setTitle(`Ustawiono - kanał ticketów`)
                                                                        .addField(`Nowa wartość`, `<#${channel.id}>`)
                                                                        .setColor(`GREEN`)
                                                                    message.channel.send(ticketChannelConfigEmbed)
                                                                } else {
                                                                    if (args[0] === "14") {
                                                                        let role = message.guild.roles.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()
                                                                        let err = isNaN(role)
                                                                        if (err === true) return client.error(message, 'Nie znalazłem tej roli')
                                                                        client.writeSettings(message, 'mutedVoiceRole', role.id)
                                                                        let mutedRoleVoiceConfigEmbed = new Discord.MessageEmbed()
                                                                            .setTitle(`Ustawiono - rola wyciszonego na kanale głosowym`)
                                                                            .addField(`Nowa wartość`, `<@${role.id}>`)
                                                                            .setColor(`GREEN`)
                                                                        message.channel.send(mutedRoleVoiceConfigEmbed)
                                                                    } else {
                                                                        if (args[0] === "15") {
                                                                            let role = message.guild.roles.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()
                                                                            let err = isNaN(role)
                                                                            if (err === true) return client.error(message, 'Nie znalazłem tej roli')
                                                                            client.writeSettings(message, 'mutedRole', role.id)
                                                                            let mutedRoleConfigEmbed = new Discord.MessageEmbed()
                                                                                .setTitle(`Ustawiono - role wyciszonego na kanale tekstowym`)
                                                                                .addField(`Nowa wartość`, `<@${role.id}>`)
                                                                                .setColor(`GREEN`)
                                                                            message.channel.send(mutedRoleConfigEmbed)
                                                                        } else {
                                                                            if (args[0] === "16") {
                                                                                let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                                                                let err = isNaN(channel)
                                                                                if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                                                                if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                                                                if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                                                                client.writeSettings(message, 'commentChannel', channel.id)
                                                                                let commentChannelConfigEmbed = new Discord.MessageEmbed()
                                                                                    .setTitle(`Ustawiono - kanał komentarzy`)
                                                                                    .addField(`Nowa wartość`, `<#${channel.id}>`)
                                                                                    .setColor(`GREEN`)
                                                                                message.channel.send(commentChannelConfigEmbed)
                                                                            } else {
                                                                                if (args[0] === "17") {
                                                                                    let role = message.guild.roles.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()
                                                                                    let err = isNaN(role)
                                                                                    if (err === true) return client.error(message, 'Nie znalazłem tej roli')
                                                                                    client.writeSettings(message, 'SlowmodeChannelOn', role.id)
                                                                                    let slowmodeRoleConfigEmbed = new Discord.MessageEmbed()
                                                                                        .setTitle(`Ustawiono - rola która nie może pisać podczas lockdownu`)
                                                                                        .addField(`Nowa wartość`, `<@${role.id}>`)
                                                                                    message.channel.send(slowmodeRoleConfigEmbed)
                                                                                } else {
                                                                                    if (args[0] === "18") {
                                                                                        let role = message.guild.roles.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()
                                                                                        let err = isNaN(role)
                                                                                        if (err === true) return message.channel.send('Nie znalazłem tej roli')
                                                                                        client.writeSettings(message, 'verificationRole', role.id)
                                                                                        let roleVerificationConfigEmbed = new Discord.MessageEmbed()
                                                                                            .setTitle(`Ustawiono - rola która ma być nadawana po zweryfikowaniu`)
                                                                                            .addField(`Nowa wartość`, `<@${role.id}>`)
                                                                                            .setColor(`GREEN`)
                                                                                        message.channel.send(roleVerificationConfigEmbed)
                                                                                    } else {
                                                                                        if (args[0] === "19") {
                                                                                            let role = message.guild.roles.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()
                                                                                            let err = isNaN(role)
                                                                                            if (err === true) return message.channel.send('Nie znalazłem tej roli')
                                                                                            client.writeSettings(message, 'roleBroadcastPing', role.id)
                                                                                            let rolePingBroadcastEmbed = new Discord.MessageEmbed()
                                                                                                .setTitle(`Ustawiono - rola która ma być oznaczana po wysłaniu ogłoszenia`)
                                                                                                .addField(`Nowa wartość`, `<@${role.id}>`)
                                                                                                .setColor(`GREEN`)
                                                                                            message.channel.send(rolePingBroadcastEmbed)
                                                                                        } else {
                                                                                            if (args[0] === "20") {
                                                                                                let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                                                                                let err = isNaN(channel)
                                                                                                if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                                                                                if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                                                                                if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                                                                                client.writeSettings(message, 'serverUpdatesChannel', channel.id)
                                                                                                let updateServerChannelConfigEmbed = new Discord.MessageEmbed()
                                                                                                    .setTitle(`Ustawiono - kanał aktualizacji serwerowych`)
                                                                                                    .addField(`Nowa wartość`, `<#${channel.id}>`)
                                                                                                    .setColor(`GREEN`)
                                                                                                message.channel.send(updateServerChannelConfigEmbed)
                                                                                            } else {
                                                                                                if (args[0] === "21") {
                                                                                                    let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                                                                                                    let err = isNaN(channel)
                                                                                                    if (err === true) return client.error(message, 'Nie znalazłem tego kanału')
                                                                                                    if (channel.type === "voice") return client.error(message, 'Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
                                                                                                    if (channel.type === "category") return client.error(message, 'Podano kategorię! Musisz podać kanał tekstowy')
                                                                                                    client.writeSettings(message, 'passChannel', channel.id)
                                                                                                    let updateServerChannelConfigEmbed = new Discord.MessageEmbed()
                                                                                                        .setTitle(`Ustawiono - kanał podań`)
                                                                                                        .addField(`Nowa wartość`, `<#${channel.id}>`)
                                                                                                        .setColor(`GREEN`)
                                                                                                    message.channel.send(updateServerChannelConfigEmbed)
                                                                                                } else {
                                                                                                    message.channel.send('Wpisz poprawny numer co mam ustawić')
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
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
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
};

exports.help = {
    name: "ustaw",
    category: "⚙️ | Ustawienia serwerowe",
    description: "Dzięki tej komendzie możesz ustawić na swoim serwerze ustawienia powitań, pożegnań, itp.",
    usage: "ustaw <numer> <ustawić na>"
};
