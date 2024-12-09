import { createEvent } from "seyfert";
import { ActivityType, PresenceUpdateStatus } from "seyfert/lib/types";

export default createEvent({
  data: { once: true, name: "botReady" },
  async run(user, client) {
    client.logger.info(`${user.username} está listo!!!`);
    client.gateway.setPresence({
      activities: [
        { name: 'Viendo las pendejadas que escriben', type: ActivityType.Playing, state: 'discord.gg/cn5WruRa7a' },
      ],
      since: null,
      status: PresenceUpdateStatus.Online,
      afk: false
    })
  }
})