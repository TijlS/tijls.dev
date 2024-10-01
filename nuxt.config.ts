// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	devServer: {
		host: "tijls.dev",
		port: 443,
		https: {
			key: "./ssl/tijls.dev.key",
			cert: "./ssl/tijls.dev.crt",
		},
	},

	prisma: {
		installStudio: false,
	},

	modules: ["@unlok-co/nuxt-stripe", "@sidebase/nuxt-auth", "@prisma/nuxt"],
	css: ["~/assets/scss/main.scss"],

	app: {
		head: {
			link: [
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com",
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossorigin: "",
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
				},
				{
					rel: "stylesheet",
					href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
					integrity:
						"sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==",
					crossorigin: "anonymous",
					referrerpolicy: "no-referrer",
				},
			],
		},
	},

	auth: {
		isEnabled: true,
		provider: {
			type: "local",
			endpoints: {
				signIn: {
					path: '/login',
					method: 'post'
				},
				signOut: {
					path: "/logout",
					method: "post"
				},
				getSession: {
					path: "/user",
					method: "get",
				},
				signUp: {
					path: '/register',
					method: 'post'
				}
			},
			refresh: {
				isEnabled: true,
				endpoint: {
					path: "/refresh",
					method: "post",
				},
				refreshOnlyToken: true,
				token: {
					signInResponseRefreshTokenPointer: "/token/refreshToken",
					refreshRequestTokenPointer: "/refreshToken",
				},

			},
			pages: {
				login: "/login",
			},
			token: {
				signInResponseTokenPointer: "/token/accessToken",
				maxAgeInSeconds: 60 * 5, //5 min
				sameSiteAttribute: "lax",
			},
		},
		globalAppMiddleware: {
			isEnabled: true,
		},
	},

	routeRules: {
		"/witch-caching": {
			swr: 86400000,
			auth: {
				disableServerSideAuth: true,
			},
		},
	},

	compatibilityDate: "2024-07-05",
});
