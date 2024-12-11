"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const utils_1 = require("../utils");
exports.default = (0, seyfert_1.createEvent)({
    data: { once: false, name: "guildMemberAdd" },
    async run(user, client) {
        if (user.user.bot)
            return;
        const channel = await client.channels.fetch(utils_1.config.channel);
        if (channel.isTextGuild()) {
            const random = Math.floor(Math.random() * utils_1.joinedReply.length);
            channel.messages.write({
                content: utils_1.joinedReply[random].replace("{user}", `<@${user.user.id}>`)
            });
        }
    }
});
