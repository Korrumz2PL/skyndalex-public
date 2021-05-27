module.exports = (client, message) => {
    let statuses = ["@Cobra", `${client.guilds.cache.size} serwerów`, `Strona internetowa: https://cobrabot.tk`, `Prefix: c?`, `Kontakt: kontakt@cobrabot.tk`]
setInterval(() => client.user.setActivity(`${statuses.random()}`, {type: "WATCHING"}), 10000)
}