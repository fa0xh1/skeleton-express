import { z } from 'zod'

export const permissionCreateScheme = z.object({
  name: z.string(),
  description: z
    .string()
    .nullish()
    .nullable()
    .transform((value) => value ?? undefined),
})

export const permissionUpdateScheme = z.object({
  name: z.string(),
  description: z
    .string()
    .nullish()
    .nullable()
    .transform((value) => value ?? undefined),
})
