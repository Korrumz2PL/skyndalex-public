const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {

    if(args[0]==="wejscie") {
        if(client.dbs.prepare(`SELECT welcomeEnabled FROM ServerSettings WHERE ID = ?`).get(message.guild.id).welcomeEnabled==="true") {
        client.emit('guildMemberAdd', message.member)
        let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle('Symulacja zakończona pomyślnie!')
        .setFooter('Skyndalex - Symulacja wejścia na serwer')
        message.channel.send(embed)
    } else {
        message.channel.send(`Powitania są wyłączone! Włącz je przez ${client.dbs.prepare('SELECT prefix FROM ServerSettings WHERE id = ?').get(message.guild.id).prefix}ustaw`)
    }} else {
        if(args[0]==="wyjscie") {
            if(client.dbs.prepare(`SELECT goodbyeEnabled FROM ServerSettings WHERE ID = ?`).get(message.guild.id).goodbyeEnabled==="true") {
            client.emit('guildMemberRemove', message.member)
            let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Symulacja zakończona pomyślnie!')
            .setFooter('Skyndalex - Symulacja wyjścia z serwera')
            message.channel.send(embed)
        } else {
            message.channel.send(`Pożegnania są wyłączone! Włącz je przez ${client.dbs.prepare('SELECT prefix FROM ServerSettings WHERE id = ?').get(message.guild.id).prefix}ustaw`)
        }
        } else {
            message.channel.send("Nie podałeś co mam zasymulować. Wybierz wyjscie/wejscie")
    }}
  
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "symuluj",
    category: "⚙️ | Ustawienia serwerowe",
    description: "Symuluje wejście/wyjście z serwera",
    usage: "symuluj wejscie/wyjscie"
  };
  