import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "~/lib/prisma";
import { z } from "zod";

const loginUserSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export default defineEventHandler(async (e) => {
	const result = await readValidatedBody(e, (body) =>
		loginUserSchema.safeParse(body)
	);

	if (!result.success)
		return createError({
			statusCode: 400,
			statusMessage: "Supplied data not of correct format",
			data: result.error.issues,
		});

	const username = result.data.username,
		password = result.data.password;

	//Validate user
	const userObj = await prisma.user.findFirst({
		where: {
			email: username,
		},
	});

	if (!userObj) {
		throw createError({
			statusCode: 403,
			statusMessage: "Gebruiker niet gevonden.",
		});
	}

	const passwordMatches = await bcrypt.compare(password, userObj?.password);

	if (!passwordMatches) {
		throw createError({
			statusCode: 403,
			statusMessage: "Wachtwoord klopt niet.",
		});
	}

	const user = {
		username: userObj.email,
		name: userObj.fullName,
		roles: userObj.roles,
	};

	const expiresIn = 15;
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
