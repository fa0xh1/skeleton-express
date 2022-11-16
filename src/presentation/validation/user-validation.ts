import { z } from 'zod'

export const userCreateScheme = z.object({
  email: z.string().email().min(10),
  username: z.string(),
  password: z.string(),
})
