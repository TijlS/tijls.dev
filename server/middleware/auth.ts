import { getServerSession } from "#auth";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (e) => {
	const cookies = parseCookies(e);

	if (cookies["auth.token"]) {
        try {
            // @ts-ignore
            const decoded = jwt.verify(cookies["auth.token"], process.env.SECRET)
            if (decoded) {
                e.context.roles = decoded.roles;
            }
        } catch (error) {
            console.log(error)
        }
    }
});
