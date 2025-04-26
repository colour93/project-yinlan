import 'reflect-metadata'
import { connect } from "./bot.js";
import { createLogger } from './logger.js';
import { createDataSource } from './core/database.js'

const logger = createLogger('root');

logger.debug("调试模式")

async function main() {
  try {
    // 初始化数据库
    await createDataSource()
    
    // 启动机器人
    connect()
  } catch (error) {
    console.error('应用启动失败:', error)
    process.exit(1)
  }
}

main()