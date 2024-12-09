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
const cooldown_1 = require("@slipher/cooldown");
const utils_1 = require("../utils");
const option = {
    usuario: (0, seyfert_1.createUserOption)({
        description: 'Usuario que quieres interactuar los puntos',
        required: true
    }),
    type: (0, seyfert_1.createStringOption)({
        description: 'type manage',
        required: true,
        choices: [
            { name: 'Agregar puntos de reputación', value: 'add' },
            { name: 'Quitar puntos de reputación', value: 'remove' }
        ]
    }),
    amount: (0, seyfert_1.createNumberOption)({
        description: 'number amount',
        required: true
    })
};
let ConfigCommand = class ConfigCommand extends seyfert_1.Command {
    async run(ctx) {
        const options = ctx.options;
        if (!options.usuario || !options) {
            return ctx.write({ content: 'Te falto el usuario el comando es `r!reputation-manage -id <user-id> -type <add o remove> -amount <cuantity>`' });
        }
        const channel = await ctx.client.channels.fetch(utils_1.config.logs);
        if (options.type === "add") {
            await (0, libs_1.updateUser)(options.usuario.id, 'add', options.amount);
            if (channel.isTextGuild()) {
                channel.messages.write({
                    content: `:green_circle: **\`[LOGS]\`** El usuario ${options.usuario} se le agrego la cantidad de ${options.amount}`
                });
            }
            return ctx.write({ content: `:white_check_mark: El usuario ${options.usuario} se le agrego la cantidad ${options.amount} de reputación correctamente` });
        }
        else if (options.type === "remove") {
            await (0, libs_1.updateUser)(options.usuario.id, 'remove', options.amount);
            if (channel.isTextGuild()) {
                channel.messages.write({
                    content: `:red_circle: **\`[LOGS]\`**El usuario ${options.usuario} se le removio la cantidad de ${options.amount} puntos`
                });
            }
            return ctx.write({ content: `:white_check_mark: El usuario ${options.usuario} se le elimino la cantidad ${options.amount} de reputación correctamente` });
        }
    }
};
ConfigCommand = __decorate([
    (0, cooldown_1.Cooldown)({
        type: cooldown_1.CooldownType.User,
        interval: 4000 * 60,
        uses: 1,
    }),
    (0, seyfert_1.Declare)({
        name: 'reputation_manage',
        description: 'Agrega o elimina reputación a un usuario',
        defaultMemberPermissions: ["ManageGuild"]
    }),
    (0, seyfert_1.Options)(option)
], ConfigCommand);
exports.default = ConfigCommand;
