import { H3Event } from "h3";
import jwt from "jsonwebtoken";

const TOKEN_TYPE = "Bearer";

const extractToken = (value: string) => {
	const [, token] = value.split(`${TOKEN_TYPE} `);
	return token;
};

const ensureAuth = (e: H3Event) => {
	const authHeaderValue = getRequestHeader(e, "authorization");
	if (typeof authHeaderValue === "undefined") {
		throw createError({
			statusCode: 403,
			statusMessage: "Geen geldige header gevonden",
		});
	}

	const extractedToken = extractToken(authHeaderValue);
	try {        
        //@ts-ignore
		return jwt.verify(extractedToken, process.env.SECRET);
	} catch (error) {
		console.error("Login failed. Here's the raw error:", error);
		throw createError({
			statusCode: 403,
			statusMessage: "You must be logged in to use this endpoint",
		});
	}
};

export default defineEventHandler((e) => {
	const user = ensureAuth(e);

	return user;
});
