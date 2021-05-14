const Discord = require("discord.js-light");
const klaw = require("klaw");
const { promisify } = require("util");
const path = require("path");
let client = new Discord.Client({
    cacheGuilds: true,
    cacheChannels: true,
    cacheOverwrites: true,
    cacheRoles: true,
    cacheEmojis: true,
    cachePresences: true,
})
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwNzY1MDE5ODMwNTc2NzQzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkwOTk4OTIxfQ.xGwbXy6KxJmz7jA5FGHjWw5sT0U485_pA7P0WngYKvk', client);

dbl.on('posted', () => {
  console.log('Zaktualizowano statystyki na top.gg');
})
dbl.on('error', e => {
 console.log(`Ups error! ${e}`);
})
// ------------------------------------- - panel
/*
const express = require('express')
const app = express()
const port = 6000

app.get('/', (req, res) => {
    res.send(`PANEL - ALPHA`)
})
app.listen(port, () => {
    console.log(`Example app listening at http://70.37.164.134:${port}`)
})

 */
// -------------------------------------
const Database = require('better-sqlite3');
client.dbs = new Database('settings.sqlite');
/*
client.down = 0
client.downReason = ""

 */


client.commands = new Discord.Collection()
client.aliases = new Discord.Collection();
client.config = require("./config.js");
client.readdir = promisify(require("fs").readdir);
client.version = 'v3.7 STABLE';
require("./functions.js")(client);


//komendy + eventy

(async () => {
  const cmdFiles = await client.readdir("./commands/");
 console.log(`Ładowanie ${cmdFiles.length} komend`);
  klaw("./commands").on("data", item => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== ".js") return;
    const response = client.loadCommand(`${cmdFile.name}${cmdFile.ext}`);
    if (response) console.log(response);
  });
  const evtFiles = await client.readdir("./events/");
  console.log(`Ładowanie ${evtFiles.length} eventów`);
  klaw("./events").on("data", item => {
    const evtFile = path.parse(item.path);
    if (!evtFile.ext || evtFile.ext !== ".js") return;
    const event = require(`./events/${evtFile.name}${evtFile.ext}`);
    client.on(evtFile.name, event.bind(null, client));
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }
console.log("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> ")
console.log("KORZYSTASZ Z PRZETERMINOWANEJ WERSJI KODU! NIE ZALECAMY TESTOWAĆ GO NA STABILNYCH BOTACH.")
console.log("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> ")

client.login("NzA3NjUwMTk4MzA1NzY3NDM0.XrL4mg.0pNcM-dLE9mPXQyDZJljUpDj9KA");
})();

