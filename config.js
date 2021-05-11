
const config = {
  gprogramista: ["761094393200640012", "738835796164870174", "738835796164870174"],
  programista: ["682572949219180547"],
  supporter: [""],
  tester: ["667727937499561984", "435029733344804874", "667727937499561984", "744602537788833918", "664393769088712733", "682582825043492930", "674979744290439171"],

  permLevels: [
    { level: 0, name: "Użytkownik", check: () => true },

    {
      level: 2,
      name: "Moderator",
      check: message => {
        try {
          if (
            message.member.hasPermission("MANAGE_MESSAGES") ||
            message.member.hasPermission("MANAGE_ROLES") ||
            message.member.hasPermission("MANAGE_CHANNELS") ||
            message.member.hasPermission("KICK_MEMBERS")
          )
            return true;
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 3,
      name: "Administrator",
      check: message => {
        try {
          return message.member.hasPermission("ADMINISTRATOR");
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 4,
      name: "Właściciel serwera",
      check: message =>
        message.channel.type === "text"
          ? message.guild.owner.user.id === message.author.id
            ? true
            : false
          : false
    },
    {
      level: 1,
      name: "Tester",
      check: message => config.tester.includes(message.author.id)
    },
    {
      level: 6,
      name: "Supporter",
      check: message => config.supporter.includes(message.author.id)
    },
    {
      level: 9,
      name: "Programista",
      check: message => config.programista.includes(message.author.id)
    },
    {
      level: 10,
      name: "Główny programista",
      check: message => config.gprogramista.includes(message.author.id)
    }
  ]
};

module.exports = config;
