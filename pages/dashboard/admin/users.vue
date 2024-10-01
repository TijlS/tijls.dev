<template>
    <div class="users">
        <h1>Gebruikers
            <button class="btn btn-accent1 btn-outline" @click="refreshData">REFRESH</button>
        </h1>
        <table class="table striped fixed">
            <thead>
                <tr>
                    <th class="index">#</th>
                    <th>Naam</th>
                    <th>Email</th>
                    <th>Adres</th>
                    <th>Tel</th>
                    <th>Acties</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(user, index) in users"
                    :key="user.id"
                >
                    <td class="index">{{ index + 1 }}</td>
                    <td>{{ user.fullName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.address }}</td>
                    <td>{{ user.phone }}</td>
                    <td class="space">
                        <button class="btn btn-tertiary btn-icon">
                            <i class="fas fa-pencil"></i>
                        </button>
                        <button class="btn btn-secondary btn-icon">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button v-if="!user.roles.includes('ROLE_ADMIN')" class="btn btn-warning btn-icon">
                            <i class="fas fa-lock"></i>
                        </button>
                        <button v-if="!user.roles.includes('ROLE_ADMIN')" @click="deleteUser(user.id)" class="btn btn-error btn-icon">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const { data: users, refresh: refreshData } = await useFetch('/api/prisma/user/all')

const deleteUser = async (id) => {
    const result = await $fetch('/api/prisma/user/', {
        method: 'DELETE',
        body: {
            id
        }
    })

    if(result.state == "success"){
        refreshData()
    }
}
</script>