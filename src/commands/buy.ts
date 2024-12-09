import { Declare, Command, type CommandContext, IgnoreCommand } from 'seyfert';
import { config, rewards_pandora_1, rewards_pandora_2, shopList } from '../utils';
import { getUser, updateUser } from '../libs';

@Declare({
  name: 'buy',
  description: 'Cuando compres la recompensa jeej',
  ignore: IgnoreCommand.Slash,
})
export default class BuyCmd extends Command {
  async run(ctx: CommandContext) {
    const args = ctx.message?.content.split(" ")[1]
    const author = ctx.author
    const userData = await getUser(author.id)
    if (userData.reputation < 1300) return ctx.write({ content: 'Para poder comprar debes tener un minimo de 1300 puntos de reputación' })
    if (!Number(args)) return ctx.write({ content: 'Selecciona el id de la recompensa' })
    if (shopList[0].id === Number(args)) {
      const random = Math.floor(Math.random() * rewards_pandora_1.length)
      await updateUser(author.id, 'remove', shopList[0].price)
      let reward = rewards_pandora_1[random]
      await ctx.write({
        content: `La caja de pandora nivel 1 te dio: ${reward}`
      });
      if (reward.includes("Reclama") || reward.includes("XP")) {
        const channel = await ctx.client.channels.fetch(config.logs)
        if (channel.isTextGuild()) {
          channel.messages.write({
            content: `**\`[LOGS]\`** El usuario ${author} gano ${reward} <@&1311565754642202686>!!`
          })
        }
      }
    } else if (shopList[1].id === Number(args)) {
      await updateUser(author.id, 'remove', shopList[1].price)
      const random = Math.floor(Math.random() * rewards_pandora_1.length)
      let reward = rewards_pandora_2[random]
      if (reward.includes("Reclama") || reward.includes("XP") || reward.includes("NITRO")) {
        const channel = await ctx.client.channels.fetch(config.logs)
        if (channel.isTextGuild()) {
          channel.messages.write({
            content: `**\`[LOGS]\`** El usuario ${author} gano ${reward} <@&1311565754642202686>!!`
          })
        }
      }
      await ctx.write({
        content: `La caja de pandora nivel 2 te dio: ${reward}`
      });

    }
  }
}