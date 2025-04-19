import { z } from 'zod';
import fs from 'fs';

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
  )
});

if (!fs.existsSync('./config.json')) {

}
const configRaw = fs.readFileSync('./config.json', 'utf-8');
const configParsed = JSON.parse(configRaw);

export const config = configSchema.parse(configParsed);