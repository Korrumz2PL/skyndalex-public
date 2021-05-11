const Discord = require('discord.js-light')
module.exports = async (client, oldGuild, newGuild) => {
  if(client.dbs.prepare(`SELECT logsEnabled FROM ServerSettings WHERE ID = ?`).get(newGuild.id).logsEnabled==="true") {
    if(client.dbs.prepare(`SELECT logsGuildeUpdate FROM ServerSettings WHERE ID = ?`).get(newGuild.id).logsGuildeUpdate==="true") {
      let tof = {
          false: "Nie",
          true: "Tak"
        }
      let embed = new Discord.MessageEmbed()
      .setTitle('Logi - Edytowano serwer!')
    .setColor('#ff8800')
      if(oldGuild.name!=newGuild.name) {
        embed.addField('Nazwa serwera przed', oldGuild.name)
        .addField('Nazwa serwera po', newGuild.name)
      }
      if(oldGuild.afkChannelID!=newGuild.afkChannelID) {
        embed.addField('Kanał afk przed', oldGuild.afkChannel)
        .addField('Kanał afk po', newGuild.afkChannel)
      }
      if(oldGuild.afkTimeout!=newGuild.afkTimeout) {
        embed.addField('Maksymalny czas bycia afk przed (sekundy)', oldGuild.afkTimeout)
        .addField('Maksymalny czas bycia afk po (sekundy)', newGuild.afkTimeout)
      }
      if(oldGuild.description!=newGuild.description) {
      if(oldGuild.description)  embed.addField('Opis przed', `\``+oldGuild.description+`\``)
      if(!oldGuild.description)  embed.addField('Opis przed', 'Brak')
        if(newGuild.description)  embed.addField('Opis przed', `\``+newGuild.description+`\``)
      if(!newGuild.description)  embed.addField('Opis po', 'Brak')
      }
      if(oldGuild.icon!=newGuild.icon) {
        embed.addField('Ikona przed', `[Link](${oldGuild.iconURL({dynamic: true})})`)
        embed.addField('Ikona po', `[Link](${newGuild.iconURL({dynamic: true})})`)
      }
      if(oldGuild.region!=newGuild.region) {
        let regions = {
          "europe": "Europa",
          "eu-west": "Europa zachodnia",
          "eu-central": "Europa centralna",
          "brazil": "Brazylia",
          "hongkong": "Hongkong",
          "india": "Indie",
          "japan": "Japonia",
          "russia": "Rosja",
          "singapore": "Singapur",
          "southafrica": "Afryka południowa",
          "sydney": "Sydney",
          "us-central": "USA centralne",
          "us-east": "USA wschodnie",
          "us-south": "USA południowe",
          "us-west": "USA zachodnie"
        }
        embed.addField('Region przed', regions[oldGuild.region])
        embed.addField('Region po', regions[newGuild.region])
      }
      if(oldGuild.rulesChannelID!=newGuild.rulesChannelID) {
        embed.addField('Kanał zasad przed', oldGuild.rulesChannel||"Brak")
        embed.addField('Kanał zasad po', newGuild.rulesChannel||"Brak")
      }
      if(oldGuild.systemChannelID!=newGuild.systemChannelID) {
        embed.addField('Kanał systemowy przed', oldGuild.systemChannel|"Brak")
        embed.addField('Kanał systemowy po', newGuild.systemChannel||"Brak")
      }
      if(oldGuild.vanityURLCode!=newGuild.vanityURLCode) {
        embed.addField('Customowy kod zaproszeń przed', oldGuild.vanityURLCode||"Brak")
        embed.addField('Customowy kod zaproszeń po', newGuild.vanityURLCode||"Brak")
      }
      if(oldGuild.verificationLevel!=newGuild.verificationLevel) {
        let ver = {
          "NONE": "Żaden",
          "LOW": "Niski",
          "MEDIUM": "Średni",
          "HIGH": "Wysoki",
          "VERY-HIGH": "Najwyższy"
        }
        embed.addField('Poziom weryfikacji przed', ver[oldGuild.verificationLevel])
        embed.addField('Poziom weryfikacji po', ver[newGuild.verificationLevel])
      }
      if(oldGuild.widgetEnabled!=newGuild.widgetEnabled) {
        embed.addField('Widżet włączony przed', tof[oldGuild.widgetEnabled])
        embed.addField('Widżet włączony po', tof[newGuild.widgetEnabled])
      }
      if(oldGuild.widgetChannelID!=newGuild.widgetChannelID) {
        embed.addField('Kanałł widżetu przed', oldGuild.widgetChannel||"Brak")
        embed.addField('Kanał widżetu', newGuild.widgetChannel||"Brak")
      }
        newGuild.channels.cache.get(client.dbs.prepare(`SELECT logsChannel FROM ServerSettings WHERE ID = ?`).get(newGuild.id).logsChannel).send(embed)

  }
}  
}