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
const libs_1 = require("../libs");
const cooldown_1 = require("@slipher/cooldown");
const utils_1 = require("../utils");
const option = {
    id: (0, seyfert_1.createStringOption)({
        description: 'id',
        required: true,
    }),
    type: (0, seyfert_1.createStringOption)({
        description: 'type manage',
        required: true
    }),
    amount: (0, seyfert_1.createNumberOption)({
        description: 'number amount',
        required: true
    })
};
let ConfigCommand = class ConfigCommand extends seyfert_1.Command {
    run(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = ctx.options;
            if (!options.id || !options) {
                return ctx.write({ content: 'Te falto el usuario el comando es `r!reputation-manage -id <user-id> -type <add o remove> -amount <cuantity>`' });
            }
            const channel = yield ctx.client.channels.fetch(utils_1.config.logs);
            if (options.type === "add") {
                yield (0, libs_1.updateUser)(options.id, 'add', options.amount);
                if (channel.isTextGuild()) {
                    channel.messages.write({
                        content: `:green_circle: **\`[LOGS]\`** El usuario **<@${options.id}>** se le agrego la cantidad de ${options.amount}`
                    });
                }
                return ctx.write({ content: `:white_check_mark: El usuario <@${options.id}> se le agrego la cantidad ${options.amount} de reputación correctamente` });
            }
            else if (options.type === "remove") {
                yield (0, libs_1.updateUser)(options.id, 'remove', options.amount);
                if (channel.isTextGuild()) {
                    channel.messages.write({
                        content: `:red_circle: **\`[LOGS]\`**El usuario **<@${options.id}>** se le removio la cantidad de ${options.amount} puntos`
                    });
                }
                return ctx.write({ content: `:white_check_mark: El usuario <@${options.id}> se le elimino la cantidad ${options.amount} de reputación correctamente` });
            }
        });
    }
};
ConfigCommand = __decorate([
    (0, cooldown_1.Cooldown)({
        type: cooldown_1.CooldownType.User,
        interval: 4000 * 60,
        uses: 1,
    }),
    (0, seyfert_1.Declare)({
        name: 'reputation-manage',
        description: 'Config reputation ',
        ignore: seyfert_1.IgnoreCommand.Slash,
        aliases: ["rm"],
        defaultMemberPermissions: ["ManageGuild"]
    }),
    (0, seyfert_1.Options)(option)
], ConfigCommand);
exports.default = ConfigCommand;
