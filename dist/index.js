"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const cooldown_1 = require("@slipher/cooldown");
const client = new seyfert_1.Client({
    commands: {
        prefix: (_msg) => {
            return ['lary ', "r!"];
        },
        reply: (_ctx) => true,
        deferReplyResponse: (_ctx) => ({ content: 'Thinking...' })
    },
});
client.start().then(() => {
    client.cooldown = new cooldown_1.CooldownManager(client);
    client.uploadCommands();
    console.log('Bot client on');
}).catch(e => console.log(e));
