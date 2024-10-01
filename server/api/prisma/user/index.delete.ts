import prisma from "~/lib/prisma"
import { z } from "zod"

const planSchema = z.object({
    id: z.string()
})

export default defineEventHandler(async (e) => {    
    if(!e.context.roles || !e.context.roles.includes('ROLE_ADMIN')) return {
        state: 'error',
        error: 'Not authenticated'
    }
    const result = await readValidatedBody(e, b => planSchema.safeParse(b))

    if(!result.success) return createError({
        statusCode: 400,
        statusMessage: "Supplied data not of correct format",
        data: result.error.issues,
    });

    const user = await prisma.user.delete({
        where: {
            id: result.data.id
        }
    })

    return {
        state: 'success',
        user
    }
})