import { Declare, Command, type CommandContext, IgnoreCommand, Embed } from 'seyfert';

@Declare({
  name: 'help',
  description: 'ayuda',
  ignore: IgnoreCommand.Slash,
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