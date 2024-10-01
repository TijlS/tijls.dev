// import bcrypt from "bcrypt"
// import prisma from "~/lib/prisma";

// export default defineEventHandler(async e => {
//     const pwd = "Tijl7965."

//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(pwd, salt);

//     const user = await prisma.user.create({
//         data: {
//             email: 'tijl.schipper@gmail.com',
//             password: hash,
//             firstName: 'Tijl',
//             lastName: 'Schipper',
//             fullName: 'Tijl Schipper',
//             roles: ['ROLE_ADMIN']
//         }
//     })

//     return {
//         user,
//         hash
//     }
// })

export default defineEventHandler(async (e) => {
    return 'lol'
})