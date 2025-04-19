import 'reflect-metadata'
import { connect } from "./bot.js";
import { createLogger } from './logger.js';

const logger = createLogger('root');

logger.debug("调试模式")

connect()