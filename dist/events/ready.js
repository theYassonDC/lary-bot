"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const types_1 = require("seyfert/lib/types");
exports.default = (0, seyfert_1.createEvent)({
    data: { once: true, name: "botReady" },
    async run(user, client) {
        client.logger.info(`${user.username} está listo!!!`);
        client.gateway.setPresence({
            activities: [
                { name: 'Viendo las pendejadas que escriben', type: types_1.ActivityType.Playing, state: 'discord.gg/cn5WruRa7a' },
            ],
            since: null,
            status: types_1.PresenceUpdateStatus.Online,
            afk: false
        });
    }
});
