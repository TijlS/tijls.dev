import prisma from "~/lib/prisma"

export default defineEventHandler(async (e) => {    
    if(!e.context.roles || !e.context.roles.includes('ROLE_ADMIN')) return []

    const users = await prisma.user.findMany({
        omit: {
            password: true
        }
    })

    return users
})