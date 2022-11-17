import { z } from 'zod'

export const roleCreateScheme = z.object({
  name: z.string(),
  description: z
    .string()
    .nullish()
    .nullable()
    .transform((value) => value ?? undefined),
})

export const roleUpdateScheme = z.object({
  name: z.string(),
  description: z
    .string()
    .nullish()
    .nullable()
    .transform((value) => value ?? undefined),
})

export const rolePermissionScheme = z.object({
  role_id: z.string(),
  permission: z.string().array(),
})
