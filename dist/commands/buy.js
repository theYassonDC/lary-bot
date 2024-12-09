"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const utils_1 = require("../utils");
const libs_1 = require("../libs");
let BuyCmd = class BuyCmd extends seyfert_1.Command {
    async run(ctx) {
        const args = ctx.message?.content.split(" ")[1];
        const author = ctx.author;
        const userData = await (0, libs_1.getUser)(author.id);
        if (userData.reputation < 1300)
            return ctx.write({ content: 'Para poder comprar debes tener un minimo de 1300 puntos de reputación' });
        if (!Number(args))
            return ctx.write({ content: 'Selecciona el id de la recompensa' });
        if (utils_1.shopList[0].id === Number(args)) {
            const random = Math.floor(Math.random() * utils_1.rewards_pandora_1.length);
            await (0, libs_1.updateUser)(author.id, 'remove', utils_1.shopList[0].price);
            let reward = utils_1.rewards_pandora_1[random];
            await ctx.write({
                content: `La caja de pandora nivel 1 te dio: ${reward}`
            });
            if (reward.includes("Reclama") || reward.includes("XP")) {
                const channel = await ctx.client.channels.fetch(utils_1.config.logs);
                if (channel.isTextGuild()) {
                    channel.messages.write({
                        content: `**\`[LOGS]\`** El usuario ${author} gano ${reward} <@&1311565754642202686>!!`
                    });
                }
            }
        }
        else if (utils_1.shopList[1].id === Number(args)) {
            await (0, libs_1.updateUser)(author.id, 'remove', utils_1.shopList[1].price);
            const random = Math.floor(Math.random() * utils_1.rewards_pandora_1.length);
            let reward = utils_1.rewards_pandora_2[random];
            if (reward.includes("Reclama") || reward.includes("XP") || reward.includes("NITRO")) {
                const channel = await ctx.client.channels.fetch(utils_1.config.logs);
                if (channel.isTextGuild()) {
                    channel.messages.write({
                        content: `**\`[LOGS]\`** El usuario ${author} gano ${reward} <@&1311565754642202686>!!`
                    });
                }
            }
            await ctx.write({
                content: `La caja de pandora nivel 2 te dio: ${reward}`
            });
        }
    }
};
BuyCmd = __decorate([
    (0, seyfert_1.Declare)({
        name: 'buy',
        description: 'Cuando compres la recompensa jeej',
        ignore: seyfert_1.IgnoreCommand.Slash,
    })
], BuyCmd);
exports.default = BuyCmd;
