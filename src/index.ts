import { Client, ParseClient } from 'seyfert';
import { CooldownManager } from '@slipher/cooldown';

const client = new Client({
  commands: {
    prefix: (_msg) => {
      return ['lary ', "r!"]
    },
    reply: (_ctx) => true,
    deferReplyResponse: (_ctx) => ({ content: 'Thinking...' })
  },
});

client.start().then(() => {
  client.cooldown = new CooldownManager(client);
  client.uploadCommands()
  console.log('Bot client on')
}).catch(e => console.log(e));
declare module 'seyfert' {
  interface UsingClient extends ParseClient<Client<true>> {
    cooldown: CooldownManager;
  }
  interface InternalOptions {
    withPrefix: true | false;
    asyncCache: false | true;
  }
  interface Client {
    cooldown: CooldownManager;
  }
}