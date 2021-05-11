const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let cos = ["Co mówi bogacz, gdy biegnie do sklepu? nawet ZaDYSZKI nie mam.", "Dlaczego uczeń krawca ma pałę? Bo guzik się nauczył!!!", "Gdzie rolnik idzie za karę? Do kozy!", "Co mówi kartka do kartki? Stary, chyba cię pogięło!", "Jakie jest ulubione powiedzenie murarza? Na mur beton.", "Co robi pociąg, kiedy widzi hama? HAMUJE!", "Ulubiony miesiąc lutownicy? Luty.", "Co robi chomik, podczas obiadu? Jod","Jaki jest ulubony owoc żołnierza? Granat.", "po co komu telefon? Żeby MIAU"]
    let embed1 = new Discord.MessageEmbed()
        .setTitle(`Suchar`)
        .setDescription(cos.random())
        .setFooter(`Źródło: https://suchary.pl/`)
    message.channel.send(embed1)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sucharek"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "suchar",
    category: "🎉 | 4fun",
    description: "Generuje suchar",
    usage: "suchar"
};