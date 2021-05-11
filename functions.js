const Discord = require('discord.js-light')
module.exports = (client) => {
  //TODO: rewrite commands handler
  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first();
    } catch (e) {
      return false;
    }
  };
  client.awaitReplyEdit = async (msg, embed, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    let searchQuestion = new Discord.MessageEmbed()
  .setTitle('Napisz numer zgłoszenia')
  .setDescription('Aby anulować akcje wpisz `anuluj`')
  .setColor('GREEN')
  .setFooter('Skyndalex - Help System Manager')
    await embed.edit(searchQuestion);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };
  client.loadCommand = (commandName) => {
    try {
      const props = require(`${process.cwd()}/commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };
  client.unloadCommand = async (commandName) => {
    const command = client.commands.get(commandName);
    if (!command) return `Komenda \`${commandName}\` nie istnieje! Sprawdź alias i spróbuj ponownie.`;
    if (command.shutdown) {
      await command.shutdown(client);
    }
    command.conf.aliases.forEach(alias => {
      client.aliases.delete(alias);
    });
    client.commands.delete(command.help.name);
    delete require.cache[require.resolve(`${process.cwd()}/commands/${command.help.name}.js`)];
    return false;
  };
  Object.defineProperty(String.prototype, "toProperCase", {
    value: function() {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    }
  });
  Object.defineProperty(Array.prototype, "random", {
    value: function() {
      return this[Math.floor(Math.random() * this.length)];
    }
  });
  client.writeSettings = async (message, settingName, setTo) => {
    client.dbs.prepare(`UPDATE ServerSettings SET ${settingName} = ? WHERE ID = ?`).run(setTo, message.guild.id)
    }

  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, {depth: 0});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "dupa");

    return text;
  };

  client.error = async (message, text) => {
    let embedError = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`Błąd!`)
        .setDescription(text.replace(client.token, '[token]'))
        .setColor('RED')
        .setFooter(`Błąd - Skyndalex ${client.version}`, client.user.displayAvatarURL())
    return message.channel.send(embedError).catch(err => {
      client.guilds.cache.get("707506586184319036").channels.cache.get("723973152660520980").send(`Problem z \`\`\`${err}\`\`\``)
      message.author.send(`Wystąpił błąd podczas wykonywania kodu! Poinformowałem programistów.\nBłąd: \`\`\`${err}\`\`\``)
    })
  }
  client.done = async (message, text) => {
    let embedError = new Discord.MessageEmbed()
        .setTitle(`Wykonano!`)
     .setDescription(text.replace(client.token, '[token]'))
    .setColor('GREEN')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setFooter(`Skyndalex ${client.version}`)
    return message.channel.send(embedError).catch(err => {
      client.guilds.cache.get("769101009024450641").channels.cache.get("769864440753160222").send(`Problem z client.done ${err}`)
      message.author.send(`Wystąpił błąd podczas wykonywania kodu! Poinformowałem programistów.\nBłąd: ${err}`)
    })
  }

  client.writeBadges = async (who, badgesList) => {
    if(client.dbs.prepare('SELECT badges FROM Profil WHERE ID=?').get(who)) {
      client.dbs.prepare(`UPDATE Profil SET badges = ? WHERE ID = ?`).run(badgesList, who)
    } else {
      client.dbs.prepare('INSERT INTO Profil (id, badges) VALUES (?, ?)').run(who, badgesList)
    }
    
  }
  client.giveBadges = async (who, badgesList) => {
    if(client.dbs.prepare('SELECT badges FROM Profil WHERE ID=?').get(who)) {
      let actualBadges = client.dbs.prepare('SELECT badges FROM Profil WHERE ID=?').get(who).badges;
      client.dbs.prepare(`UPDATE Profil SET badges = ? WHERE ID = ?`).run(actualBadges+' '+badgesList, who)
    } else {
      client.dbs.prepare('INSERT INTO Profil (id, badges) VALUES (?, ?)').run(who, badgesList)
    }
  } 
}