// !!eval message.guild.roles.cache.find(r => r.name === "Powiadomienia")
const Discord = require("discord.js");
let moment = require(`moment`)
moment.locale('pl')
exports.run = async (client, message, args, level) => {
let findroleembed = new Discord.MessageEmbed()
	.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
	.setDescription(`Oznacz rolę!`)
	.setColor(`RED`)
    
    if(!args[0]) {
        message.channel.send(findroleembed)
    } else {
        let yes = {
            false: "Nie",
            true: "Tak"
        }
        let perms = {
          "CREATE_INSTANT_INVITE": "Tworzenie zaproszeń",
          "KICK_MEMBERS": "Wyrzucanie użytkowników",
          "BAN_MEMBERS": "Banowanie użytkowników",
          "ADMINISTRATOR": "Administrator",
          "MANAGE_CHANNELS": "Zarządzanie kanałami",
          "MANAGE_GUILD": "Zarządzanie serwerem",
          "ADD_REACTIONS": "Dodawanie reakcji",
          "VIEW_AUDIT_LOG": "Dostęp do dziennika zdarzeń",
          "PRIORITY_SPEAKER": "Priorytetowy rozmówca",
          "STREAM": "Streamowanie",
          "VIEW_CHANNEL": "Czytanie kanałów tekstowych i wyświetlanie kanałów głosowych",
          "SEND_MESSAGES": "Wysyłanie wiadomości",
          "SEND_TTS_MESSAGES": "Wysyłanie wiadomości tts",
          "MANAGE_MESSAGES": "Zarządzanie wiadomościami",
          "EMBED_LINKS": "Zamieszczanie linków",
          "ATTACH_FILES": "Wysyłanie plików",
          "READ_MESSAGE_HISTORY": "Czytanie historii czatu",
          "MENTION_EVERYONE": "Wzmiankowanie everyone, here i wszystkich ról",
          "USE_EXTERNAL_EMOJI": "Używanie zewnętrznych emoji",
          "VIEW_GUILD_INSIGHTS": "Wyświetlanie statystyk",
          "CONNECT": "Łączenie",
          "SPEAK": "Mówienie",
          "MUTE_MEMBERS": "Wyciszanie członków",
          "DEAFEN_MEMBERS": "Wyciszanie dźwięku członkom",
          "MOVE_MEMBERS": "Przenoszenie członków",
          "USE_VAD": "Używanie aktywności głosowej",
          "CHANGE_NICKNAME": "Zmiana pseudonimu",
          "MANAGE_NICKNAMES": "Zarządzanie pseudonimami",
          "MANAGE_ROLES": "Zarządzanie rolami",
          "MANAGE_WEBHOOKS": "Zarządzanie webhookami",
          "MANAGE_EMOJIS": "Zarządzanie emoji"
          }
          
        let role = message.guild.roles.cache.find(r => r.name.toLowerCase()===args.join(' ').toLowerCase())||message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.join(' ').toLowerCase()))||message.guild.roles.cache.get(args[0])
        let rolecreated = moment(role.createdAt).tz('Europe/Warsaw').format('LLL')

        let permsBefore = new Discord.Permissions(role.permissions.bitfield).toArray().join(' | ')
        let permsList = perms[permsBefore]
        let err = isNaN(role)
        if(err===true) message.channel.send('Nie znaleziono roli')
        let embed = new Discord.MessageEmbed()
        .setTitle('Informacje o roli:')
        .setColor('RED')
        .setFooter('Skyndalex - roleinfo')
        .setDescription(role.name)
        .addField('ID', role.id)
        .addField('Pozycja', role.rawPosition)
        .addField('Można wzmiankować?', yes[role.mentionable])
        .addField('Wyświetlana osobno?', yes[role.hoist])
  .addField('Hex', role.hexColor)
  .addField('Permisje', `\`\`${permsBefore}\`\``)
            .addField(`Stworzono`, rolecreated)
        message.channel.send(embed)
    }
  
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Użytkownik"
  };
  
  exports.help = {
    name: "roleinfo",
    category: "🛠️ | Narzędzia",
    description: "Pokazuje informacje o danej roli",
    usage: "roleinfo <nazwa|część nazwy>"
  };
  