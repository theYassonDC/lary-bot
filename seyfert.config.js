// @ts-check is better
const { config } = require('seyfert');
require('dotenv').config()

module.exports = config.bot({
   token: process.env.BOT_TOKEN || "laryxd",
   intents: ["GuildMembers", "Guilds",  "MessageContent", "GuildMessages"],
   locations: {
       base: "src",
       output: "src", // Si utiliza bun, defina "src" en su lugar
       commands: "commands",
       events: "events"
   }
});