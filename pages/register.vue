<template>
	<div class="register bg1">
		<div class="card">
			<h1>Registreren</h1>
			<form @submit.prevent="register">
				<div class="double">
					<div class="col">
						<input
							type="text"
							v-model="name.firstname"
							required
							placeholder="Naam *"
							autocomplete="given-name"
						/>
					</div>
					<div class="col">
						<input
							type="text"
							v-model="name.lastname"
							required
							placeholder="Voornaam *"
							autocomplete="family-name"
						/>
					</div>
				</div>
				<input
					type="text"
					v-model="address"
					placeholder="Adres"
					autocomplete="address"
				/>
				<input
					type="tel"
					v-model="tel"
					placeholder="Tel"
					autocomplete="phone"
				/>
				<hr />
				<input
					type="email"
					v-model="username"
					required
					placeholder="Email *"
					autocomplete="email"
				/>
				<input
					type="password"
					v-model="password.new"
					required
					placeholder="Wachtwoord *"
					autocomplete="new-password"
				/>
				<input
					type="password"
					v-model="password.repeat"
					required
					placeholder="Herhaal wachtwoord *"
					autocomplete="new-password"
				/>
				<button class="btn btn-primary" type="submit">
					Registreren
				</button>
				<div class="errors" v-if="errors.length > 0">
					<p class="error text-error" v-for="error in errors">
						{{ error }}
					</p>
				</div>
			</form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.register {
	height: 100dvh;
	width: 100%;
	max-width: 100dvw;
	display: grid;
	place-content: center;

	.card {
		form {
			display: flex;
			flex-direction: column;
			gap: 1em;
		}

		.register {
			text-align: right;
			text-decoration: none;
			color: var(--secondary);
		}
	}
}
</style>

<script setup>
definePageMeta({
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: "/",
	},
});

const { signUp } = useAuth();

const username = ref("");
const password = ref({
	new: "",
	repeat: "",
});
const name = ref({
	firstname: "",
	lastname: "",
});
const address = ref("");
const tel = ref("");

const errors = ref([]);

const register = async () => {
	if (password.value.new !== password.value.repeat) {
		errors.value.push("Wachtwoorden komen niet overeen.");
		return;
	}

	await signUp({
		firstname: name.value.firstname,
		lastname: name.value.lastname,
		email: username.value,
        username: username.value,
		password: password.value.new,
		address: address.value,
		tel: tel.value,
	}, {
        callbackUrl: '/dashboard',
        redirect: true
    });
};
</script>
