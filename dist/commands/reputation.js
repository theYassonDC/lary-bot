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
import { Declare, Command, IgnoreCommand, Embed } from 'seyfert';
import { getUser } from '../libs';
import { Cooldown, CooldownType } from '@slipher/cooldown';
let ReputationCommand = class ReputationCommand extends Command {
    run(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const args = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.content.split(" ")[1];
            if (!args) {
                return ctx.write({ content: 'Usa el comando  correctamente `r!reputation @usuario`' });
            }
            if (args) {
                const userId = args.match(/\d+/);
                const data = yield getUser(String(userId));
                if (!data)
                    return ctx.write({ content: 'Este usuario no tiene puntos de reputacion' });
                ctx.write({
                    embeds: [
                        new Embed()
                            .setDescription(`## Reputación tranquilisera <@${userId}>`)
                            .setFields([{ name: 'Puntos de reputación', value: `:green_circle: ${data.reputation}` }])
                            .setColor("Green")
                    ]
                });
            }
        });
    }
};
ReputationCommand = __decorate([
    Declare({
        name: 'reputation',
        description: 'Mira la reputación que tienes o un usuario',
        ignore: IgnoreCommand.Slash,
        aliases: ["rep", "r", "score"]
    }),
    Cooldown({
        type: CooldownType.User,
        interval: 1000 * 60,
        uses: 2,
    })
], ReputationCommand);
export default ReputationCommand;
