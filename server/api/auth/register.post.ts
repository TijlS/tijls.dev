import bcrypt from "bcrypt"
import { z } from "zod";
import prisma from "~/lib/prisma";

const createUserSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string(),
    address: z.string().optional(),
    tel: z.string().optional()
})

export default defineEventHandler(async e => {
    const result = await readValidatedBody(e, body => createUserSchema.safeParse(body))
    if(!result.success) return createError({
        statusCode: 400,
        statusMessage: "Supplied data not of correct format",
        data: result.error.issues
    })

    const pwd = result.data.password

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pwd, salt);

    const user = await prisma.user.create({
        data: {
            email: result.data.email,
            password: hash,
            firstName: result.data.firstname,
            lastName: result.data.lastname,
            fullName: `${result.data.firstname} ${result.data.lastname}`,
            address: result.data.address,
            phone: result.data.tel,
            roles: []
        },
        omit: {
            password: true
        }
    })

    return {
        user
    }
})