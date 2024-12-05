import { Declare, Command, type CommandContext, IgnoreCommand } from 'seyfert';

@Declare({
  name: 'ping',
  description: 'Mostrar la latencia con discord',
  ignore: IgnoreCommand.Slash,
})
export default class PingCmd extends Command {
  async run(ctx: CommandContext) {

    const ping = ctx.client.gateway.latency;
    await ctx.write({
      content: `Mi latencia es \`${ping}ms\``
    });
  }
}