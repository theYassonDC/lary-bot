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
let ShopCmd = class ShopCmd extends seyfert_1.Command {
    async run(ctx) {
        let list = utils_1.shopList.sort((a, b) => a.price - b.price)
            .map(v => {
            return `\`ID ${v.id}\` :green_circle:${v.price} - **${v.name}**\n> ${v.description}\n\n`;
        }).join('');
        await ctx.write({
            embeds: [
                new seyfert_1.Embed()
                    .setTitle('Tienda de puntos de reputación')
                    .setDescription(list)
                    .setFooter({ text: 'escribe r!buy <id>' })
            ]
        });
    }
};
ShopCmd = __decorate([
    (0, seyfert_1.Declare)({
        name: 'shop',
        description: 'Recompensas al obtener muchos puntos de recompensa',
        ignore: seyfert_1.IgnoreCommand.Slash,
        aliases: ["lb", "store", "rewards"]
    })
], ShopCmd);
exports.default = ShopCmd;
