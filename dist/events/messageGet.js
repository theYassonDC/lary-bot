"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const libs_1 = require("../libs");
const utils_1 = require("../utils");
exports.default = (0, seyfert_1.createEvent)({
    data: { once: false, name: "messageCreate" },
    async run(user, _client) {
        if (user.user.bot)
            return;
        const time = 5 * 60 * 1000;
        if (user.channelId === utils_1.config.channel) {
            const userExits = await (0, libs_1.getUser)(user.user.id);
            if (userExits.user_id === user.user.id) {
                const random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                setTimeout(async () => await (0, libs_1.updateUser)(user.user.id, 'add', random), time);
            }
            else {
                (0, libs_1.createUser)(user.user.id);
            }
        }
    }
});
