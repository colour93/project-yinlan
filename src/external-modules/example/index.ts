import { BaseCommand, Command, Module, Args, Permission, Message } from '../../core/decorators.js'
import { Structs } from 'node-napcat-ts'
import { EnhancedMessage } from '../../typings/Message.js'

@Module('external-example')
export default class ExternalExampleModule extends BaseCommand {
  initialize() {
  }

  @Command('hello', '打招呼')
  @Permission('external-example.hello')
  async handleHello(
    @Message() message: EnhancedMessage,
  ) {
    const name = message.sender.nickname
    await message.quick_action([
      Structs.text(`你好，${name}！`)
    ])
  }
} 