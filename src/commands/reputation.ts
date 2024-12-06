import { Declare, Command, type CommandContext, IgnoreCommand, Embed } from 'seyfert';
import { getUser } from '../libs';
import { Cooldown, CooldownType } from '@slipher/cooldown';

@Declare({
  name: 'reputation',
  description: 'Mira la reputación que tienes o un usuario',
  ignore: IgnoreCommand.Slash,
  aliases: ["rep", "r", "score"]
})
@Cooldown({
  type: CooldownType.User,
  interval: 1000 * 60,
  uses: 2,
})
export default class ReputationCommand extends Command {
  async run(ctx: CommandContext) {
    const args = ctx.message?.content.split(" ")[1]
    if(!args) {
      return ctx.write({ content: 'Usa el comando  correctamente `r!reputation @usuario`' }) 
    }
    if (args) {
      const userId = args!.match(/\d+/)
      const data = await getUser(String(userId))
      if (!data) return ctx.write({ content: 'Este usuario no tiene puntos de reputacion' })
      ctx.write({
        embeds: [
          new Embed()
          .setDescription(`## Reputación tranquilisera <@${userId}>`)
          .setFields([{ name: 'Puntos de reputación', value: `:green_circle: ${data.reputation}` }])
          .setColor("Green")
        ]
      })
    }
  }
}