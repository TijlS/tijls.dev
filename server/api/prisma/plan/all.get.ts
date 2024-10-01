import prisma from "~/lib/prisma"

export default defineEventHandler(async (e) => {    
    const plans = await prisma.plan.findMany({
        include: {
            categories: true
        },
    })

    return plans
})