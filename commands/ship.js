const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Kogo chcesz sprawdzić?`)
    if (!args[1]) return client.error(message, `Napisz 2 rzeczy!`)
    let procenty = Math.floor(Math.random() * (100 - 0) + 0)
  //  let hearts = ["❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤"]
    let argument1 = args[0]
    let argument2 = args[1]
    let percent = Math.floor(Math.random() * (100 - 0) + 0)
    const Embed = new Discord.MessageEmbed()
        .setTitle(`Wyniki testu!`)
        .setDescription(`${argument1} oraz ${argument2} kochają się na ${procenty}%`)
        .setColor("BLUE")
    message.channel.send(Embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ship"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "ship",
    category: "🎉 | 4fun",
    description: "Sprawdź poziom miłości.",
    usage: "ship"
};
