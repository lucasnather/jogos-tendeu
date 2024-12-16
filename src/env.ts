import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().optional().default(8080),
    POSTGRES_PORT: z.coerce.number(),
    POSTGRES_USERNAME: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string(),
})

export type EnvType = z.infer<typeof envSchema>
