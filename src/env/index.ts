import 'dotenv/config'
import { z as zod } from 'zod'

const envSchema = zod.object({
  NODE_ENV: zod.enum(['development', 'test', 'production']).default('development'),
  PORT: zod.coerce.number().default(3333),
  JWT_SECRET: zod.string(),
  DATABASE_URL: zod.string(),
  SECRET_COOKIE: zod.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment: ', _env.error.format())
  throw new Error('Invalid environment')
}

export const env = _env.data