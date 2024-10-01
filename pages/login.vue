<template>
    <div class="login bg1">
        <div class="card">
            <h1>Login</h1>
            <form @submit.prevent="signIn({ username, password }, { callbackUrl: $route.query.redirect ?? '/' })">
                <input type="text" v-model="username" placeholder="Email" autocomplete="username">
                <input type="password" v-model="password" placeholder="Wachtwoord" autocomplete="current-password">
                <NuxtLink to="/register" class="register">
                    <i class="fas fa-chevron-right"></i>&ensp;Registreren
                </NuxtLink>
                <button class="btn btn-primary" type="submit">
                    Login
                </button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login{
    height: 100dvh;
    width: 100%;
    max-width: 100dvw;
    display: grid;
    place-content: center;

    .card{
        form{
            display: flex;
            flex-direction: column;
            gap: 1em;
        }

        .register{
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
        navigateAuthenticatedTo: '/'
    }
})

const { signIn } = useAuth()

const username = ref("")
const password = ref("")
</script>