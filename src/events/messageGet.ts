import { createEvent } from "seyfert";
import { createUser, getUser, updateUser } from "../libs";
import { config, sleep } from "../utils";

export default createEvent({
  data: { once: false, name: "messageCreate" },
  async run(user, client) {
    if (user.user.bot) return
    const time = 5 * 60 * 1000
    await sleep(time)
    if (user.channelId === config.channel) {
      const userExits = await getUser(user.user.id)
      if (userExits.user_id === user.user.id) {
        const random = Math.floor(Math.random() * (3 - 1 + 1) + 1)
        await updateUser(user.user.id, 'add', random)
        const channel = await client.channels.fetch(config.logs)
        if (channel.isTextGuild()) {
          channel.messages.write({ 
            content: `**\`[LOGS]\`** El usuario **${user.user.name}** se le agrego la cantidad de **\`+${random}\`** de reputación por hablar en el chat`
          })
        }
      }else {
        createUser(user.user.id)
        const channel = await client.channels.fetch(config.logs)
        if (channel.isTextGuild()) {
          channel.messages.write({ 
            content: `**\`[LOGS]\`** El usuario **${user.user.name}** se le registro en el gremio de puntos de reputacion`
          })
        }
      }
    }
  }
})