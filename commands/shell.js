exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const { exec } = require("child_process");

  exec(args.join(' '), (error, stdout, stderr) => {
      if (error) {
          message.channel.send("```" + error.message + "```");
          return;
      }
      if (stderr) {
          message.channel.send("```" + stderr + "```");
          return;
      }
      message.channel.send("```" + stdout + "```");
  });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Programista"
};

exports.help = {
  name: "shell",
  category: "🔴 | Deweloperskie",
  description: "Wykonuje komendę z cmd",
  usage: "shell <komenda>"
};
