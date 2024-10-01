import prisma from "~/lib/prisma"
import { z } from "zod"

const planSchema = z.object({
    name:        z.string(),
    description: z.string(),
    price:       z.number(),
    visible:     z.boolean(),
    type:        z.enum(['GENERAL', 'CUSTOM']),
    paymentType: z.enum(['MONTHLY', 'YEARLY', 'VARIABLE'])
})

export default defineEventHandler(async (e) => {    
    if(!e.context.roles || !e.context.roles.includes('ROLE_ADMIN')) return {
        state: 'error',
        error: 'Not authenticated'
    }
    const body = await readValidatedBody(e, b => planSchema.safeParse(b))

    if(!body.success) return {
        state: 'error',
        error: body.error.issues
    }

    const plan = await prisma.plan.create({
        data: {
            name: body.data.name,
            description: body.data.description,
            price: body.data.price,
            visible: body.data.visible,
            type: body.data.type,
            paymentType: body.data.paymentType,
            stripeId: ''
        }
    })

    return {
        state: 'success',
        plan
    }
})