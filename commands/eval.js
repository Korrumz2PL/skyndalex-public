const Discord = require("discord.js");


exports.run = async (client, message, args, level) => {
  let cToken = new RegExp(client.token, "g");


  if (!args[0]) return client.error(message, `Nie podano kodu wejściowego!`)
  const clean = text => {
    if (typeof text === "string")
      return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203))
          .replace(cToken, "token");
    else return text;
  };
  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    /*
        const embedgut = new Discord.MessageEmbed()
            .setTitle("Eval")
            .setColor("03fc41")
        .setDescription(`📥 Wejściowy :\`\`\`js\n${code}\`\`\`\n:outbox_tray: Wyjściowy :\n\`\`\`js\n${clean(evaled)}\n\`\`\` `)
          message.channel.send(embedgut);
     */
    message.channel.send(`\`\`\`js\n${clean(evaled)}\`\`\``)

  } catch (err) {
    message.channel.send(`\`\`\`xl\n${clean(err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Programista"
};

exports.help = {
  name: "eval",
  category: "🔴 | Deweloperskie",
  description: "Evaluuj kod javascript.",
  usage: "eval <kod>"
};