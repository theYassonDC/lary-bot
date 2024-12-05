// @ts-check is better
import { config } from 'seyfert';
import "dotenv/config"

export default config.bot({
   token: process.env.BOT_TOKEN || "laryxd",
   intents: ["GuildMembers", "Guilds",  "MessageContent", "GuildMessages"],
   locations: {
       base: "src",
       output: "dist", // Si utiliza bun, defina "src" en su lugar
       commands: "commands",
       events: "events"
   }
});