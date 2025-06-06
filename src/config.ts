import { z } from 'zod';
import fs from 'fs';
import { createLogger } from './logger.js';

const logger = createLogger('config');

const configSchema = z.object({
  ob: z.object({
    protocol: z.enum(['ws', 'wss']),
    host: z.string(),
    port: z.number(),
    baseUrl: z.string().optional(),
    accessToken: z.string().optional(),
    throwPromise: z.boolean().optional(),
    reconnection: z.object({
      enable: z.boolean().optional(),
      attempts: z.number().optional(),
      delay: z.number().optional()
    }).optional()
  }).refine(
    (data) => (data.baseUrl !== undefined) || (data.host !== undefined && data.port !== undefined && data.protocol !== undefined),
    { message: "必须提供 baseUrl 或 (host, port, protocol) 组合" }
  ),
  db: z.object({
    type: z.enum(['sqlite', 'mysql', 'postgres']),
    host: z.string().optional(),
    port: z.number().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    database: z.string(),
    synchronize: z.boolean().optional(),
    logging: z.boolean().optional()
  }).optional(),
  modules: z.any().optional()
});

if (!fs.existsSync('./config.json')) {
  logger.error('请先创建 config.json')
  throw new Error('config.json not found')
}

const configRaw = fs.readFileSync('./config.json', 'utf-8');
const configParsed = JSON.parse(configRaw);

export const config = configSchema.parse(configParsed);

export const modulesConfig = (config.modules ?? {}) as Record<string, any>;