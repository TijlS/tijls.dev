<template>
    <header :class="scrollClass">
        <NuxtLink to="/" class="brand">
            <h3>TijlS</h3>
        </NuxtLink>
        <nav>
            <NuxtLink to="/" class="nav-item">Home</NuxtLink>
            <ClientOnly>
                <NuxtLink v-if="rolesChecker(data, 'ROLE_USER')" to="/dashboard" class="nav-item">Dashboard</NuxtLink>
                <NuxtLink v-if="rolesChecker(data, 'ROLE_USER')" to="/logout" class="nav-item btn btn-primary btn-outline">Afmelden</NuxtLink>
                <NuxtLink v-else to="/login" class="nav-item btn btn-primary">Inloggen</NuxtLink>
            </ClientOnly>
        </nav>
    </header>
</template>

<script setup>
const scrollClass = ref("")

const { data, getSession, refresh } = useAuth()

onMounted(async () => {
    const sessionData = await getSession({
        force: true
    })
    
    if(!sessionData){
        await refresh()
    }
})
</script>

<style lang="scss" scoped>
header{
    position: fixed;
    display: flex;
    align-items: center;
    padding: .75rem 2.5rem;
    width: 100%;
    background-color: #fff;

    .brand{
        color: #000;
        text-decoration: none;
    }

    nav{
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 2em;

        .nav-item{
            color: #000;
            text-decoration: none;
        }
    }
}
</style>