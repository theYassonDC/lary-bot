"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const cooldown_1 = require("@slipher/cooldown");
let HelpCommand = class HelpCommand extends seyfert_1.Command {
    run(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new seyfert_1.Embed()
                .setTitle('Comandos rlary bot')
                .setDescription(`
      > \`r!reputation\`
      > \`r!top\`
      > \`r!shop\`
      `);
            yield ctx.write({
                embeds: [embed]
            });
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
