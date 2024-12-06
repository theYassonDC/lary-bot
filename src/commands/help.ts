import { Declare, Command, type CommandContext, IgnoreCommand, Embed } from 'seyfert';
import { Cooldown, CooldownType } from '@slipher/cooldown';

@Declare({
  name: 'help',
  description: 'ayuda',
  ignore: IgnoreCommand.Slash,
})
@Cooldown({
  type: CooldownType.User,
  interval: 1000 * 60,
  uses: 2,
})
export default class HelpCommand extends Command {
  async run(ctx: CommandContext) {
    const embed = new Embed()
    .setTitle('Comandos rlary bot')
    .setDescription(`
      > \`r!reputation\`
      > \`r!top\`
      > \`r!shop\`
      `)
    await ctx.write({
      embeds: [embed]
    });
  }
}