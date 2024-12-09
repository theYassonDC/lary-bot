"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const cooldown_1 = require("@slipher/cooldown");
let HelpCommand = class HelpCommand extends seyfert_1.Command {
    async run(ctx) {
        const embed = new seyfert_1.Embed()
            .setTitle('Comandos rlary bot')
            .setDescription(`
      > \`r!reputation\`
      > \`r!top\`
      > \`r!shop\`
      `);
        await ctx.write({
            embeds: [embed]
        });
    }
};
HelpCommand = __decorate([
    (0, seyfert_1.Declare)({
        name: 'help',
        description: 'ayuda',
        ignore: seyfert_1.IgnoreCommand.Slash,
    }),
    (0, cooldown_1.Cooldown)({
        type: cooldown_1.CooldownType.User,
        interval: 1000 * 60,
        uses: 2,
    })
], HelpCommand);
exports.default = HelpCommand;
