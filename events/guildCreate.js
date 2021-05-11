module.exports = async (client, guild) => {
    console.log(guild.name)
    client.dbs.prepare('INSERT INTO ServerSettings (ID, welcomeEnabled, welcomeMessage, goodbyeEnabled, goodbyeMessage, prefix) VALUES (?,?,?,?,?,?)').run(`${guild.id}`, `false`, `Witaj {{user}}`, `false`, `Żegnaj {{user}}`, `?`)
  }