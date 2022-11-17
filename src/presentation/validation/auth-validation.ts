import { z } from 'zod'

export const authValidation = z.object({
  username: z.string(),
  password: z.string(),
})
