 const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    if (args[0] === "pomoc") {
        let InfoHelpEmbedEconomy = new Discord.MessageEmbed()
            .setTitle(`Pomoc z komend ekonomicznych`)
            .addField(`\`\`ekonomia konto\`\``, `Sprawdź swój stan konta`)
            .addField(`\`\`ekonomia pracuj\`\``, `Idź do pracy`)
            .addField(`\`\`ekonomia dodaj-monety\`\``, `Przekaż monety użytkownikowi`)
            .addField(`\`\`ekonomia programista\`\``, `Idź do pracy jako programista`)
            .addField(`\`\`ekonomia bankier\`\``, `Idź do pracy jako bankier`)
            .addField(`\`\`ekonomia rynek\`\``, `Chwilowo niedostępne`)
            .addField(`\`\`ekonomia kopalnia\`\``, `Idź do kopalni`)
            .addField(`\`\`ekonomia info-zarobki\`\``, `Informacje o zarobkach`)
            .addField(`\`\`ekonomia set-valute\`\``, `Wybierz nową walutę ekonomii`)
            .addField(`\`\`ekonomia przelej\`\``, `Funkcja nieskończona`)
            .setColor(`GREEN`)
        message.channel.send(InfoHelpEmbedEconomy)
    } else {
        if (args[0] === "pracuj") {
            let number = Math.floor(Math.random() * (1000 - 0) + 0)
            let embedWork = new Discord.MessageEmbed()
                .setTitle(`Wykonano pracę!`)
                .setDescription(`Poszedłeś do pracy i zarobiłeś ${number} SkyCoinów!`)
                .setColor(`GREEN`)
            message.channel.send(embedWork)
            if(!client.dbs.prepare('SELECT * FROM economy WHERE id=? AND serverid=?').get(message.author.id, message.guild.id)) {
                parseInt(client.dbs.prepare('INSERT INTO economy (id, skyCoin, serverid) VALUES (?, ?, ?)').run(message.author.id, 0, message.guild.id))
            }
            let money = parseInt(client.dbs.prepare('SELECT * FROM economy WHERE id=? AND serverid=?').get(message.author.id, message.guild.id).skyCoin) + parseInt(number)
            client.dbs.prepare('UPDATE economy SET skyCoin=? WHERE id=? AND serverid=?').run(parseInt(money), message.author.id, message.guild.id)
        } else {
            if (args[0] === "konto") {
                if(!client.dbs.prepare('SELECT * FROM economy WHERE id=? AND serverid=?').get(message.author.id, message.guild.id)) {
                    parseInt(client.dbs.prepare('INSERT INTO economy (id, skyCoin, serverid) VALUES (?, ?, ?)').run(message.author.id, 0, message.guild.id))
                }
                const user = message.mentions.users.first()  || client.users.cache.get(args[2]) || message.author;
                if (!user) return client.error(message, `Nie znaleziono użytkownika!`)
                let embedAccount = new Discord.MessageEmbed()
                    .setTitle(`Konto`)
                    .setColor('GREEN')
                    .setDescription(`Stan konta użytkownika <@${user.id}> wynosi:\n${await client.dbs.prepare(`SELECT * FROM economy WHERE id=? AND serverid=?`).get(message.author.id, message.guild.id).skyCoin}`)
                message.channel.send(embedAccount)
            } else {
                if (args[0] === "dodaj-monety") {
                    if(!message.member.hasPermission('KICK_MEMBERS')) return client.error(message, `Nie masz permisji!`)
                        let moneySize = parseInt(client.dbs.prepare('SELECT * FROM economy WHERE id=? AND serverid=?').get(message.author.id, message.guild.id).skyCoin) + parseInt(args[2])
                        let user = message.mentions.users.first()
                        if (!args[2]) return client.error(message, `Podaj ilość monet`)
                        if (isNaN(args[2])) return client.error(message, `To, co wpisałeś nie jest liczbą!`)
                        client.dbs.prepare(`UPDATE economy SET skyCoin=? WHERE id=? AND serverid=?`).run(moneySize, message.author.id, message.guild.id)
                        let embedMoneySucefully = new Discord.MessageEmbed()
                            .setTitle(`Dodano monety`)
                            .setDescription(`Dodano skyCoiny użytkownikowi <@${user.id}>\nilość: ${args[2]}`)
                            .setFooter(`Skyndalex || Ekonomia`)
                            .setColor(`GREEN`)
                        message.channel.send(embedMoneySucefully)
                    } else {
                  if (args[0] === "kopalnia") {
                      let number = Math.floor(Math.random() * (100 - 0) + 0)
                      let embedCave = new Discord.MessageEmbed()
                          .setTitle(`Wykonano!`)
                          .setDescription(`poszedłeś do kopalni i zarobiłeś ${number} SkyCoinów!`)
                          .setColor(`GREEN`)
                      message.channel.send(embedCave)
                      if(!client.dbs.prepare('SELECT * FROM economy WHERE id=? AND serverid=?').get(message.author.id, message.guild.id)) {
                          parseInt(client.dbs.prepare('INSERT INTO economy (id, skyCoin, serverid) VALUES (?, ?, ?)').run(message.author.id, 0, message.guild.id))
                      }
                      let money = parseInt(client.dbs.prepare('SELECT * FROM economy WHERE id=? AND serverid=?').get(message.author.id, message.guild.id).skyCoin) + parseInt(number)
                      client.dbs.prepare('UPDATE economy SET skyCoin=? WHERE id=? AND serverid=?').run(parseInt(money), message.author.id, message.guild.id)
                  } else {
                      if (args[0] === "programista") {
                          let number = Math.floor(Math.random() * (200 - 0) + 0)
                          let embedProgrammer = new Discord.MessageEmbed()
                              .setTitle(`Wykonano!`)
                              .setDescription(`Pracowałeś jako programista i zarobiłeś ${number} SkyCoinów!`)
                              .setColor(`GREEN`)
                          message.channel.send(embedProgrammer)
                          if(!client.dbs.prepare('SELECT * FROM economy WHERE id=? AND serverid=?').get(message.author.id, message.guild.id)) {
                              parseInt(client.dbs.prepare('INSERT INTO economy (id, skyCoin, serverid) VALUES (?, ?, ?)').run(message.author.id, 0, message.guild.id))
                          }
                          let money = parseInt(client.dbs.prepare('SELECT * FROM economy WHERE id=? AND serverid=?').get(message.author.id, message.guild.id).skyCoin) + parseInt(number)
                          client.dbs.prepare('UPDATE economy SET skyCoin=? WHERE id=? AND serverid=?').run(parseInt(money), message.author.id, message.guild.id)
                      } else {
                          if (args[0] === "bankier") {
                              let number = Math.floor(Math.random() * (400 - 0) + 0)
                              let embedBank = new Discord.MessageEmbed()
                                  .setTitle(`Wykonano!`)
                                  .setDescription(`Pracowałeś jako bankier i zarobiłeś ${number} SkyCoinów!`)
                                  .setColor(`GREEN`)
                              message.channel.send(embedBank)
                              if(!client.dbs.prepare('SELECT * FROM economy WHERE id=? AND serverid=?').get(message.author.id, message.guild.id)) {
                                  parseInt(client.dbs.prepare('INSERT INTO economy (id, skyCoin, serverid) VALUES (?, ?, ?)').run(message.author.id, 0, message.guild.id))
                              }
                              let money = parseInt(client.dbs.prepare('SELECT * FROM economy WHERE id=? AND serverid=?').get(message.author.id, message.guild.id).skyCoin) + parseInt(number)
                              client.dbs.prepare('UPDATE economy SET skyCoin=? WHERE id=? AND serverid=?').run(parseInt(money), message.author.id, message.guild.id)
                          } else {
                                  if (args[0] === "info-zarobki") {
                                      let embedInfoZar = new Discord.MessageEmbed()
                                          .setTitle(`Informacje o zarobkach`)
                                          .addField(`\`\`Rynek\`\``, `od **0** do **150** skyCoinów`)
                                          .addField(`\`\`Programista\`\``, `od **0** do **200** skyCoinów`)
                                          .addField(`\`\`Zwykła praca\`\``, `od **0** do **1000** skyCoinów`)
                                          .addField(`\`\`Bankier\`\``, `od **0** do **400** skyCoinów`)
                                          .setColor(`GREEN`)
                                      message.channel.send(embedInfoZar)
                                  } else {
                                      if (args[0] === "info-cooldown") {
                                          let embedColdownsInfo = new Discord.MessageEmbed()
                                              .setColor(`GREEN`)
                                              .setTitle(`Informacje o cooldownach.`)
                                              .addField(`\`\`rynek\`\``, `coldown resetuje się co \`\`30min\`\``)
                                              .addField(`\`\`Programista\`\``, `cooldown resetuje się co \`\`45min\`\``)
                                              .addField(`\`\`Zwykła praca\`\``, `cooldown resetuje się co \`\`2h\`\``)
                                              .addField(`\`\`Bankier\`\``, `cooldown resetuje się co \`\`25min\`\``)
                                          message.channel.send(embedColdownsInfo)
                                      } else {
                                          if (args[0] === "set-valute") {
                                              if(!message.member.hasPermission('KICK_MEMBERS')) return client.error(message, `Nie masz permisji!`)
                                              client.writeSettings(message, 'economyValute', `${args[1]}`)
                                              client.done(message, `Ustawiono walutę ekonomii na ${args[1]}!`)
                                          } else {
                                              if (args[0] === "przelej") {
                                              message.channel.send(`Funkcja nie została skończona!`)
                                              } else {
                                                  if (args[0] === "rynek") {
                                                      message.channel.send(`test`)
                                                  } else {
                                                      let embed = new Discord.MessageEmbed()
                                                          .setTitle(`Nowy system ekonomii!`)
                                                          .setDescription(`Użyj komendy \`\`ekonomia pomoc\`\` aby dowiedzieć się więcej informacji!`)
                                                          .setColor(`GREEN`)
                                                      message.channel.send(embed)
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
    guildOnly: false,
    aliases: ["economy"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "ekonomia",
    category: "🇮 | Informacyjne",
    description: "System ekonomii",
    usage: "ekonomia"
};