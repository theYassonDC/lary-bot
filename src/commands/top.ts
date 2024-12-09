import { Declare, Command, type CommandContext, IgnoreCommand, Embed } from 'seyfert';
import { getUsers, Users } from '../libs';
import { config } from '../utils';

@Declare({
  name: 'top',
  description: 'Top con mas puntos de reputación del server',
  ignore: IgnoreCommand.Slash,
})
export default class TopCommand extends Command {
  async run(ctx: CommandContext) {
    const usersRep: Users[] = await getUsers()
    let listUsers = usersRep.sort((a, b) => b.reputation - a.reputation).slice(0, 10)
    let top = listUsers.map((v, i) => {
      return `\`#${i+1}\` <@${v.user_id}> - **:green_circle:${v.reputation}**\n`
    }).join('')
    let userIndex = listUsers.map((v, i) => {
      let msg = ''
      if (v.user_id === ctx.author.id) {
        msg = `Estas en el top #${i+1}`
      }
      return msg
    })
    return await ctx.write({
      embeds: [
        new Embed()
        .setTitle('Top 10 de usuarios con mas reputación')
        .setDescription(top)
        .setColor('Gold')
        .setImage(config.banner)
        .setFooter({ text: userIndex[0] })
      ]
    });
  }
}