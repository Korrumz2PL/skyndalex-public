const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
    const Embed = new Discord.MessageEmbed()
        .setColor("GREEN")
	.setTitle("Przydatne linki")
        .setDescription("[Link do bota](https://top.gg/bot/707650198305767434)\n\n[Strona internetowa](https://skyndalex.tk)\n\n[DBlista.pl](https://dblista.pl/bots/skyndalex)\n\n[Top.gg](https://top.gg/bot/707650198305767434)\n\n[DiscordBots](https://discord.bots.gg/bots/707650198305767434)")
    message.channel.send(Embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["invite", "Invite", "zaproszenie", "dodaj"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "zapros",
    category: "🇮 | Informacyjne",
    description: "Zaproś bota!.",
    usage: "zapros"
};
