"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const libs_1 = require("../libs");
const utils_1 = require("../utils");
exports.default = (0, seyfert_1.createEvent)({
    data: { once: false, name: "messageCreate" },
    run(user, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.user.bot)
                return;
            const time = 5 * 60 * 1000;
            if (user.channelId === utils_1.config.channel) {
                const userExits = yield (0, libs_1.getUser)(user.user.id);
                if (userExits.user_id === user.user.id) {
                    const random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                    yield (0, utils_1.sleep)(time);
                    yield (0, libs_1.updateUser)(user.user.id, 'add', random);
                    const channel = yield client.channels.fetch(utils_1.config.logs);
                    if (channel.isTextGuild()) {
                        channel.messages.write({
                            content: `**\`[LOGS]\`** El usuario **${user.user.name}** se le agrego la cantidad de **\`+${random}\`** de reputación por hablar en el chat`
                        });
                    }
                }
                else {
                    (0, libs_1.createUser)(user.user.id);
                    const channel = yield client.channels.fetch(utils_1.config.logs);
                    if (channel.isTextGuild()) {
                        channel.messages.write({
                            content: `**\`[LOGS]\`** El usuario **${user.user.name}** se le registro en el gremio de puntos de reputacion`
                        });
                    }
                }
            }
        });
    }
});
