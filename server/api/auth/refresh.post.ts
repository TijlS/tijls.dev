import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma";

interface User {
	username: String;
	name: String;
	roles: String[];
}

interface JwtPayload extends User {
	scope: Array<"test" | "user">;
	exp: Number;
}

export default defineEventHandler(async (e) => {
	const body = await readBody(e);

	if (!body.refreshToken) {
		throw createError({
			statusCode: 403,
			statusMessage: "Refreshtoken required",
		});
	}

	// @ts-ignore
	const decoded = jwt.verify(body.refreshToken, process.env.SECRET) as JwtPayload | undefined;

	if (!decoded) {
		throw createError({
			statusCode: 403,
			statusMessage: "refreshToken can't be verified",
		});
	}

	const expiresIn = 60 * 5; //5 min
	const user = {
		username: decoded.username,
		name: decoded.name,
		roles: decoded.roles,
	};

	const refreshToken = jwt.sign(
		{
			...user,
		},
		//@ts-ignore
		process.env.SECRET,
		{
			expiresIn: 60 * 60 * 24,
		}
	);

	const accessToken = jwt.sign(
		{
			...user,
		},
		//@ts-ignore
		process.env.SECRET,
		{
			expiresIn,
		}
	);

	//Store refreshToken
	await prisma.refreshToken.create({
		data: {
			token: refreshToken,
			accessToken,
            //@ts-ignore
			user,
		},
	});

	return {
		token: {
			accessToken,
			refreshToken,
		},
	};
});
