import { Client } from 'seyfert';
import { CooldownManager } from '@slipher/cooldown';
const client = new Client({
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
    client.cooldown = new CooldownManager(client);
    client.loadEvents();
});
