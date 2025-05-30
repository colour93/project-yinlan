import { NCWebsocket } from 'node-napcat-ts'
import { config } from './config.js'
import { CommandManager } from './core/commandManager.js'
import { ModuleLoader } from './core/moduleLoader.js'
import { Message, EnhancedMessage } from './typings/Message.js'
import { createLogger } from './logger.js'

const logger = createLogger('bot')

export async function connect() {
  try {
    const bot = new NCWebsocket(config.ob, false)
    const commandManager = new CommandManager()
    const moduleLoader = ModuleLoader.getInstance(commandManager)

    // 加载所有模块
    moduleLoader.loadModules()

    bot.on('message', async (message: Message) => {
      const msg = message.message.reduce((text, content) => {
        if (content.type === 'text') {
          return text + content.data.text
        }
        return text
      }, "")

      if (!msg.startsWith('.')) return

      // 二次封装 message，添加 reply 方法用于快速回复
      const enhancedMessage: EnhancedMessage = {
        ...message,
        reply: async (replyMessage) => {
          await bot.send_msg({
            user_id: message.sender.user_id,
            group_id: message.message_type === 'group' ? message.group_id : undefined,
            message: replyMessage
          });
        },
        getQuoteMessage: async () => {
          const quoteMessage = message.message.find(m => m.type === 'reply')

          if (!quoteMessage) return

          const rawQuoteMessage = await bot.get_msg({
            message_id: Number(quoteMessage.data.id)
          })

          return rawQuoteMessage
        }
      };

      const [command, ...args] = msg.slice(1).split(' ')

      await commandManager.handleCommand(bot, enhancedMessage, command, args)
    })

    await bot.connect()
    logger.info("Onebot 连接成功")

    logger.info(`好友 ${(await bot.get_friend_list()).length} 个`)
  } catch (error) {
    logger.error("Onebot 连接失败: ", error)
    process.exit(1)
  }
}