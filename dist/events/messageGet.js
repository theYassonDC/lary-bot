"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const libs_1 = require("../libs");
const utils_1 = require("../utils");
exports.default = (0, seyfert_1.createEvent)({
    data: { once: false, name: "messageCreate" },
    async run(user, client) {
        if (user.user.bot)
            return;
        const time = 5 * 60 * 1000;
        if (user.channelId === utils_1.config.channel) {
            const userExits = await (0, libs_1.getUser)(user.user.id);
            if (userExits.user_id === user.user.id) {
                const random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                await (0, utils_1.sleep)(time);
                await (0, libs_1.updateUser)(user.user.id, 'add', random);
                const channel = await client.channels.fetch(utils_1.config.logs);
                if (channel.isTextGuild()) {
                    channel.messages.write({
                        content: `**\`[LOGS]\`** El usuario **${user.user.name}** se le agrego la cantidad de **\`+${random}\`** de reputación por hablar en el chat`
                    });
                }
            }
            else {
                (0, libs_1.createUser)(user.user.id);
                const channel = await client.channels.fetch(utils_1.config.logs);
                if (channel.isTextGuild()) {
                    channel.messages.write({
                        content: `**\`[LOGS]\`** El usuario **${user.user.name}** se le registro en el gremio de puntos de reputacion`
                    });
                }
            }
        }
    }
});
