import { createEvent } from "seyfert";
import { config, joinedReply } from "../utils";

export default createEvent({
  data: { once: false, name: "guildMemberAdd" },
  async run(user, client) {
    const channel = await client.channels.fetch(config.channel)
    if (channel.isTextGuild()) {
      const random = Math.floor(Math.random() * joinedReply.length)
      channel.messages.write({
        content: joinedReply[random].replace("{user}", `<@${user.user.id}>`)
      })
    }
  }
})