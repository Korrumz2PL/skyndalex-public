module.exports = async (client, guild) => {
    console.log(guild.name)
    client.dbs.prepare('DELETE FROM ServerSettings WHERE ID=?').run(guild.id)
  }