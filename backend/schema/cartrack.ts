import { z } from "zod"

export const startTrackSchema = z.object({
    start: z.number(),
    description: z.string().max(512).optional(),
})
