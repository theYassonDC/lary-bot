import { createEvent } from "seyfert";
import { createUser, getUser, updateUser } from "../libs";
import { config } from "../utils";

export default createEvent({
  data: { once: false, name: "messageCreate" },
  async run(user, _client) {
    if (user.user.bot) return
    const time = 5 * 60 * 1000
    if (user.channelId === config.channel) {
      const userExits = await getUser(user.user.id)
      if (userExits.user_id === user.user.id) {
        const random = Math.floor(Math.random() * (3 - 1 + 1) + 1)
        setTimeout(async () => await updateUser(user.user.id, 'add', random), time)
      } else {
        createUser(user.user.id)
      }
    }
  }
})