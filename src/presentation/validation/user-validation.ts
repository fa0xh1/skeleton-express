import { z } from 'zod'

export const userCreateScheme = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
})

export const userUpdateScheme = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
})

export const userRoleScheme = z.object({
  user_id: z.string(),
  role_id: z.string().array(),
})
