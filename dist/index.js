"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seyfert_1 = require("seyfert");
const cooldown_1 = require("@slipher/cooldown");
const express_1 = __importDefault(require("express"));
const client = new seyfert_1.Client({
    commands: {
        prefix: (_msg) => {
            return ['lary ', "r!"];
        },
        reply: (_ctx) => true,
        deferReplyResponse: (_ctx) => ({ content: 'Thinking...' })
    },
});
// Esto iniciará la conexión con la gateway de Discord y cargará comandos, eventos, componentes y langs
client.start().then(() => {
    client.cooldown = new cooldown_1.CooldownManager(client);
    client.loadEvents();
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
