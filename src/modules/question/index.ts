import { BaseCommand, Command, Module, Permission, Message, Args } from '../../core/decorators.js'
import { Structs } from 'node-napcat-ts'
import { EnhancedMessage } from '../../typings/Message.js'
import OpenAI from 'openai'
import { modulesConfig } from '../../config.js'
import { createLogger } from '../../logger.js'
import { questionConfig } from './schema.js'

const logger = createLogger('question')

@Module('question')
export default class QuestionModule extends BaseCommand {
  enabled = false
  llm?: OpenAI
  model?: string

  initialize() {
    if (questionConfig?.enabled) {

      if (!questionConfig?.llm?.apiKey) {
        logger.error('请先配置 question.llm.apiKey')
        throw new Error('请先配置 question.llm.apiKey')
      }

      if (!questionConfig?.llm?.baseURL) {
        logger.error('请先配置 question.llm.baseURL')
        throw new Error('请先配置 question.llm.baseURL')
      }

      if (!questionConfig?.llm?.model) {
        logger.error('请先配置 question.llm.model')
        throw new Error('请先配置 question.llm.model')
      }

      this.llm = new OpenAI({
        apiKey: questionConfig?.llm?.apiKey,
        baseURL: questionConfig?.llm?.baseURL,
      })

      this.model = questionConfig?.llm?.model
      this.enabled = true
    }
  }

  @Command('提问', 'llm 快速提问')
  @Permission('question.ask')
  async handleAsk(
    @Message() message: EnhancedMessage,
    @Args() args: string[],
  ) {
    if (!this.enabled) {
      await message.quick_action([
        Structs.text('模块未启用')
      ])
      return
    }

    logger.debug(message)

    const question = args.join(' ')

    if (!question) {
      await message.quick_action([
        Structs.text('请输入问题')
      ])
      return
    }

    const response = await this.llm?.chat.completions.create({
      model: this.model!,
      messages: [{ role: 'user', content: question }],
    })

    await message.quick_action([
      Structs.text(response?.choices[0].message.content ?? '没有回答')
    ])
  }
} 