import { Declare, Command, type CommandContext, IgnoreCommand, createStringOption, createNumberOption, Options } from 'seyfert';
import { updateUser } from '../libs';
import { Cooldown, CooldownType } from '@slipher/cooldown';
import { config } from '../utils';

const option = {
  id: createStringOption({
    description: 'id',
    required: true,
  }),
  type: createStringOption({
    description: 'type manage',
    required: true
  }),
  amount: createNumberOption({
    description: 'number amount',
    required: true
  })
}

@Cooldown({
  type: CooldownType.User,
  interval: 4000 * 60,
  uses: 1,
})
@Declare({
  name: 'reputation-manage',
  description: 'Config reputation ',
  ignore: IgnoreCommand.Slash,
  aliases: ["rm"],
  defaultMemberPermissions: ["ManageGuild"]
})
@Options(option)
export default class ConfigCommand extends Command {
  async run(ctx: CommandContext<typeof option>) {
    const options = ctx.options
    if (!options.id || !options) {
      return ctx.write({ content: 'Te falto el usuario el comando es `r!reputation-manage -id <user-id> -type <add o remove> -amount <cuantity>`' })
    }
    const channel = await ctx.client.channels.fetch(config.logs)
    if (options.type === "add") {
      await updateUser(options.id, 'add', options.amount)
      if (channel.isTextGuild()) {
        channel.messages.write({ 
          content: `:green_circle: **\`[LOGS]\`** El usuario **<@${options.id}>** se le agrego la cantidad de ${options.amount}`
        })
      }
      return ctx.write({ content: `:white_check_mark: El usuario <@${options.id}> se le agrego la cantidad ${options.amount} de reputación correctamente` })
    } else if (options.type === "remove") {
      await updateUser(options.id, 'remove', options.amount)
      if (channel.isTextGuild()) {
        channel.messages.write({ 
          content: `:red_circle: **\`[LOGS]\`**El usuario **<@${options.id}>** se le removio la cantidad de ${options.amount} puntos`
        })
      }
      return ctx.write({ content: `:white_check_mark: El usuario <@${options.id}> se le elimino la cantidad ${options.amount} de reputación correctamente` })
    }
  }
}