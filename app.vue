<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup>
const { getSession } = useAuth()

// onMounted(() => {
//   getSession({
//     force: true
//   })
// })
</script>