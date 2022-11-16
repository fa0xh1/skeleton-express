import { z } from 'zod'

export const permissionCreateScheme = z.object({
  name: z.string(),
  description: z.string(),
})

export const permissionUpdateScheme = z.object({
  name: z.string(),
  description: z.string(),
})
