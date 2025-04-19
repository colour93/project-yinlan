import { BaseCommand, Command, Module, Permission, Message, Args } from '../../core/decorators.js'
import { Structs } from 'node-napcat-ts'
import { EnhancedMessage } from '../../typings/Message.js'

@Module('example')
export default class ExampleModule extends BaseCommand {
  initialize() {
    console.log('Example module initialized')
  }

  @Command('ping', '测试机器人是否在线')
  @Permission('example.ping')
  async handlePing(
    @Message() message: EnhancedMessage,
  ) {
    await message.reply([
      Structs.text('pong!')
    ])
  }

  @Command('echo', '复读')
  @Permission('example.echo')
  async handleEcho(
    @Message() message: EnhancedMessage,
    @Args() args: string[]
  ) {
    const content = args.join(' ')
    await message.reply([
      Structs.text(content || '你没有提供任何内容')
    ])
  }
} 