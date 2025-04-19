import { BaseCommand, Command, Module, Permission, Message, Args } from '../../core/decorators.js'
import { Structs } from 'node-napcat-ts'
import { EnhancedMessage } from '../../typings/Message.js'

@Module('utils')
export default class ExampleModule extends BaseCommand {
  initialize() {
  }

  @Command('ping', '测试机器人是否在线')
  @Permission('utils.ping')
  async handlePing(
    @Message() message: EnhancedMessage,
  ) {
    await message.reply([
      Structs.text('pong!')
    ])
  }
} 