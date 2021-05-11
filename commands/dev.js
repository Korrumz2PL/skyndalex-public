const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    if(args[0]==="cm") {
      if(args[1]==="rl") {
        if(!args[2]) return message.channel.send('Szefie, co ty chcesz odładować?')
  let response = await client.unloadCommand(args[2]);
  if (response) return client.error(message, `Wystąpił problem podczas odładowywania: ${response}`);

  response = client.loadCommand(args[2]);
  if (response) return client.error(message, `Wystąpił problem podczas ładowania: ${response}`);

  client.done(message,`Komenda \`${args[2]}\` została przeładowana`);
      } else {
        if(args[1]==="l") {
          if(!args[2]) return message.channel.send('Szefie, co ty chcesz załadować?')

  let response = client.loadCommand(args[2]);
  if (response) return client.error(message, `Wystąpił problem podczas ładowania: ${response}`);

  client.done(message,`Komenda \`${args[2]}\` została przeładowana`);
        } else {
          if(args[1]==="u") {
            if(!args[2]) return message.channel.send('Szefie, co ty chcesz odładować?')

  let response = client.unloadCommand(args[2]);
  client.done(message, `Odpowiedź: ${response}`);

          } else {
            if(args[1]==="r") {
              if(!args[2]) return message.channel.send('Szefie, co ty chcesz odładować?')
  let response = await client.unloadCommand(args[2]);
  if (response) client.error(message, `Wystąpił problem podczas odładowywania: ${response}`);

  let responseTwo = client.loadCommand(args[2]);
  if (responseTwo) client.error(message, `Wystąpił problem podczas ładowania: ${response}`);
  if (responseTwo&&response) return client.error(message,`Komenda \`${args[2]}\` nie została ani załadowana ani odładowana`);
  if (!responseTwo&&response) return client.done(message,`Komenda \`${args[2]}\` nie została odładowana, ale została załadowana`);
  if (responseTwo&&!response) return client.error(message,`Komenda \`${args[2]}\` komenda została odładowana ale nie została załadowana`);
  if (!responseTwo&&!response) return client.done(message,`Komenda \`${args[2]}\` została przeładowana`);
            }
          }
        }
      }
    } else {
      let embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Komendy developerskie - spis')
      .setDescription(`dev cm rl <komenda> - tradycyjny stary reload\ndev cm u <komenda> - odładuj komendę\ndev cm l <komenda> - załaduj komendę\ndev cm r <komenda> - nowy system reload, odładowywuje i potem ładuje komendę nawet gdy odładować się jej nie da`)
      .setFooter('Skyndalex')
      message.channel.send(embed)
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Programista"
};

exports.help = {
  name: "dev",
  category: "🔴 | Deweloperskie",
  description: "???",
  usage: "dev"
};

