import { Declare, Command, type CommandContext, IgnoreCommand, Embed } from 'seyfert';
import { config, rewards_pandora_2, shopList } from '../utils';

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
      return `\`ID ${v.id}\` **${v.name} -** **[${v.price}](${config.banner})**:green_circle:\n${v.description.replace("{probability}", `${(1/rewards_pandora_2.length).toFixed(4)}%`)}\n\n`
    }).join('')
    await ctx.write({
      embeds: [
        new Embed()
        .setTitle('Tienda de puntos de reputación')
        .setDescription(list)
        .setFooter({ text: 'Compra uno escribiendo r!buy <id>' })
      ]
    });
  }
}