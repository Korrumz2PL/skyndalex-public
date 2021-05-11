exports.run = async (client, message, args, level) => {
    const Discord = require("discord.js");
    const codex = args.join(" ");
  const code = codex.replace(client.token, 'NIE DLA PSA KIEŁBASA KURDE! (Easteregg)')
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    message.channel.send(`\`\`\`js\n${clean}\n\`\`\``)
    message.react('✅')
  } catch (err) {
    message.channel.send(`KEKŁO SIĘ NO`)
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
   // message.channel.send(await client.clean(client, err))
    message.react('❌')
 }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Programista"
  };
  
  exports.help = {
    name: "meval",
    category: "🔴 | Deweloperskie",
    description: "jem dwie kanapki na raz k0x",
    usage: "meval <kod>"
  };
  