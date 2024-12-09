var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createEvent } from "seyfert";
import { createUser, getUser, updateUser } from "../libs";
import { config, sleep } from "../utils";
export default createEvent({
    data: { once: false, name: "messageCreate" },
    run(user, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.user.bot)
                return;
            const time = 5 * 60 * 1000;
            if (user.channelId === config.channel) {
                const userExits = yield getUser(user.user.id);
                if (userExits.user_id === user.user.id) {
                    const random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                    yield sleep(time);
                    yield updateUser(user.user.id, 'add', random);
                    const channel = yield client.channels.fetch(config.logs);
                    if (channel.isTextGuild()) {
                        channel.messages.write({
                            content: `**\`[LOGS]\`** El usuario **${user.user.name}** se le agrego la cantidad de **\`+${random}\`** de reputación por hablar en el chat`
                        });
                    }
                }
                else {
                    createUser(user.user.id);
                    const channel = yield client.channels.fetch(config.logs);
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
