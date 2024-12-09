import { Declare, Command, type CommandContext, createStringOption, createNumberOption, Options, createUserOption } from 'seyfert';
import { updateUser } from '../libs';
import { Cooldown, CooldownType } from '@slipher/cooldown';
import { config } from '../utils';

const option = {
  usuario: createUserOption({
    description: 'Usuario que quieres interactuar los puntos',
    required: true
  }),
  type: createStringOption({
    description: 'type manage',
    required: true,
    choices: [
      {name: 'Agregar puntos de reputación', value: 'add'},
      {name: 'Quitar puntos de reputación', value: 'remove'}
    ]
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
  name: 'reputation_manage',
  description: 'Agrega o elimina reputación a un usuario',
  defaultMemberPermissions: ["ManageGuild"]
})
@Options(option)
export default class ConfigCommand extends Command {
  async run(ctx: CommandContext<typeof option>) {
    const options = ctx.options
    if (!options.usuario || !options) {
      return ctx.write({ content: 'Te falto el usuario el comando es `r!reputation-manage -id <user-id> -type <add o remove> -amount <cuantity>`' })
    }    const channel = await ctx.client.channels.fetch(config.logs)
    if (options.type === "add") {
      await updateUser(options.usuario.id, 'add', options.amount)
      if (channel.isTextGuild()) {
        channel.messages.write({ 
          content: `:green_circle: **\`[LOGS]\`** El usuario ${options.usuario} se le agrego la cantidad de ${options.amount}`
        })
      }
      return ctx.write({ content: `:white_check_mark: El usuario ${options.usuario} se le agrego la cantidad ${options.amount} de reputación correctamente` })
    } else if (options.type === "remove") {
      await updateUser(options.usuario.id, 'remove', options.amount)
      if (channel.isTextGuild()) {
        channel.messages.write({ 
          content: `:red_circle: **\`[LOGS]\`**El usuario ${options.usuario} se le removio la cantidad de ${options.amount} puntos`
        })
      }
      return ctx.write({ content: `:white_check_mark: El usuario ${options.usuario} se le elimino la cantidad ${options.amount} de reputación correctamente` })
    }
  }
}