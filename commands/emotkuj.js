const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let text = args.splice('').join(' ')
    if (!text) return client.error(message, `Nie podano tekstu bądź wystąpił inny błąd`)
    if (text.length > 1000) return client.error(message, "Teskt nie może być większy niż 1000 znaków")
    let replaced = text
    .replace(/a/gi, '🇦 ')
    .replace(/ą/gi, '🇦 ')
    .replace(/b/gi, '🇧 ')
    .replace(/c/gi, '🇨 ')
    .replace(/ć/gi, '🇨 ')
    .replace(/d/gi, '🇩 ')
    .replace(/e/gi, '🇪 ')
    .replace(/ę/gi, '🇪 ')
    .replace(/f/gi, '🇫 ')
    .replace(/g/gi, '🇬 ')
    .replace(/h/gi, '🇭 ')
    .replace(/i/gi, '🇮 ')
    .replace(/j/gi, '🇯 ')
    .replace(/k/gi, '🇰 ')
    .replace(/l/gi, '🇱 ')
    .replace(/ł/gi, '🇱 ')
    .replace(/m/gi, '🇲 ')
    .replace(/n/gi, '🇳 ')
    .replace(/ń/gi, '🇳 ')
    .replace(/o/gi, '🇴 ')
    .replace(/ó/gi, '🇴 ')
    .replace(/p/gi, '🇵 ')
    .replace(/q/gi, '🇶 ')
    .replace(/r/gi, '🇷 ')
    .replace(/s/gi, '🇸 ')
    .replace(/ś/gi, '🇸 ')
    .replace(/t/gi, '🇹 ')
    .replace(/u/gi, '🇺 ')
    .replace(/v/gi, '🇻 ')
    .replace(/w/gi, '🇼 ')
    .replace(/x/gi, '🇽 ')
    .replace(/y/gi, '🇾 ')
    .replace(/z/gi, '🇿 ')
    .replace(/ż/gi, '🇿 ')
    .replace(/ź/gi, '🇿 ')
    .replace(/1/g, '1️⃣ ')
    .replace(/2/g, '2️⃣ ')
    .replace(/3/g, '3️⃣ ')
    .replace(/4/g, '4️⃣ ')
    .replace(/5/g, '5️⃣ ')
    .replace(/6/g, '6️⃣ ')
    .replace(/7/g, '7️⃣ ')
    .replace(/8/g, '8️⃣ ')
    .replace(/9/g, '9️⃣ ')
    .replace(/0/g, '0️⃣ ')
    message.channel.send(replaced).catch(err => {
        message.channel.send(`\`\`\`${err}\`\`\``)
    })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["textemoji"],
    permLevel: "Użytkownik"
};

exports.help = {
    name: "emotkuj",
    category: "🎉 | 4fun",
    description: "Bot zamienia twój tekst w emoji",
    usage: "emotkuj"
};