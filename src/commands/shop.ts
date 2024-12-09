import { Declare, Command, type CommandContext, IgnoreCommand, Embed } from 'seyfert';
import { shopList } from '../utils';

@Declare({
  name: 'shop',
  description: 'Recompensas al obtener muchos puntos de recompensa',
  ignore: IgnoreCommand.Slash,
  aliases: ["lb", "store", "rewards"]
})
export default class ShopCmd extends Command {
  async run(ctx: CommandContext) {
    let list = shopList.sort((a, b) => a.price - b.price)
    .map(v => {
      return `\`ID ${v.id}\` :green_circle:${v.price} - **${v.name}**\n> ${v.description}\n\n`
    }).join('')
    await ctx.write({
      embeds: [
        new Embed()
        .setTitle('Tienda de puntos de reputación')
        .setDescription(list)
        .setFooter({ text: 'escribe r!buy <id>' })
      ]
    });
  }
}