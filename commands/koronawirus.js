const request = require("request");
const Discord = require("discord.js");
exports.run = (client, message, args, level) => {
    try {
        if (!args[0]) {
            request(`https://api.thevirustracker.com/free-api?global=stats`, function (error, response, body) {
                let json = JSON.parse(body);
                message.channel.startTyping()
                const tekstemb = new Discord.MessageEmbed()
		    .setThumbnail(client.user.displayAvatarURL({size: 1024}))
      		    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                    .setColor("RANDOM")
                    .setTitle("Statystyki COVID-19:")
                    .addField("Chorzy:", json.results[0].total_cases, true)
                    .addField("Zgony:", json.results[0].total_deaths, true)
                    .addField("Wyleczeni:", json.results[0].total_recovered, true)
                    .addField(`Łączne nowe przypadki zarażenia dzisiaj`, json.results[0].total_new_cases_today, true)
                    .addField(`Łączne nowe przypadki zgonów dzisiaj`, json.results[0].total_new_deaths_today, true)
                    .addField(`Wszystkich dotkniętych krajów przez koronawirusa`, json.results[0].total_affected_countries, true)
                    //.addField("Odświeżono o:", ods, false)
                    .setTimestamp();
                message.channel.send(tekstemb);
                message.channel.stopTyping()
                return;
            });
        }
        if (args[0]) {
            request(`https://api.thevirustracker.com/free-api?countryTotal=${args[0]}`, function (
                error,
                response,
                body
            ) {
                let json = JSON.parse(body);
                message.channel.startTyping()
                let tekemb = new Discord.MessageEmbed()
		        .setThumbnail(client.user.displayAvatarURL({size: 1024}))
      		    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                    .setColor("RANDOM")
                    .setTitle(`Statystyki COVID-19 dla ${json.countrydata[0].info.title} (${args[0]}):`)
                    .addField("Chorzy:", json.countrydata[0].total_cases || `Błąd!`, true)
                    .addField("Zgony:", json.countrydata[0].total_deaths || `Błąd!`, true)
                    .addField("Wyleczeni:", json.countrydata[0].total_recovered || `Błąd!`, true)
                    .addField(`Łączne nowe przypadki zarażenia dzisiaj`, json.countrydata[0].total_new_cases_today, true)
                    .addField(`Łączne nowe przypadki zgonów dzisiaj`, json.countrydata[0].total_new_deaths_today, true)
                    .setTimestamp()
                message.channel.send(tekemb);
                message.channel.stopTyping()
            });
        }
    } catch (err) {
        const txtemb = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Error: " + err);
        return message.channel.send(txtemb);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["coronavirus"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "koronawirus",
    category: "🛠️ | Narzędzia",
    description: "Statystyki covid19.",
    usage: "koronawirus (skrót nazwy kraju np. PL, US)"
};
