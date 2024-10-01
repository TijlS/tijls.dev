<template></template>

<script setup>
const { signOut } = useAuth()

definePageMeta({
    auth: false
})

onMounted(async () => {
    await signOut({
        callbackUrl: '/'
    })
})
</script>