import { z } from 'zod'
import { modulesConfig } from '../../config.js'

export const questionSchema = z.object({
  enabled: z.boolean().optional(),
  llm: z.object({
    baseURL: z.string(),
    apiKey: z.string(),
    model: z.string(),
  }).optional(),
}).optional()

export const questionConfig = questionSchema.parse(modulesConfig.question)