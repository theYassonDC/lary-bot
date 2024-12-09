"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const libs_1 = require("../libs");
const utils_1 = require("../utils");
let TopCommand = class TopCommand extends seyfert_1.Command {
    async run(ctx) {
        const usersRep = await (0, libs_1.getUsers)();
        let listUsers = usersRep.sort((a, b) => b.reputation - a.reputation).slice(0, 10);
        let top = listUsers.map((v, i) => {
            return `\`#${i + 1}\` <@${v.user_id}> - **:green_circle:${v.reputation}**\n`;
        }).join('');
        let userIndex = listUsers.map((v, i) => {
            let msg = '';
            if (v.user_id === ctx.author.id) {
                msg = `Estas en el top #${i + 1}`;
            }
            return msg;
        });
        return await ctx.write({
            embeds: [
                new seyfert_1.Embed()
                    .setTitle('Top 10 de usuarios con mas reputación')
                    .setDescription(top)
                    .setColor('Gold')
                    .setImage(utils_1.config.banner)
                    .setFooter({ text: userIndex[0] })
            ]
        });
    }
};
TopCommand = __decorate([
    (0, seyfert_1.Declare)({
        name: 'top',
        description: 'Top con mas puntos de reputación del server',
        ignore: seyfert_1.IgnoreCommand.Slash,
    })
], TopCommand);
exports.default = TopCommand;
