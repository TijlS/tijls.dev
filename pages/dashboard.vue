<template>
    <div class="dashboard">
        <nav class="sidenav">
            <NuxtLink to="/dashboard" class="nav-item">
                <i class="fas fa-home fa-lg"></i>
            </NuxtLink>
            <NuxtLink to="/dashboard/invoices" class="nav-item">
                <i class="fas fa-file-invoice-dollar fa-lg"></i>
            </NuxtLink>
            <NuxtLink to="/dashboard/account" class="nav-item">
                <i class="fas fa-user-gear fa-lg"></i>
            </NuxtLink>
            <NuxtLink v-if="rolesChecker(data, 'ROLE_ADMIN')" to="/dashboard/admin/users" class="nav-item --first-admin">
                <i class="fas fa-users-gear fa-lg"></i>
            </NuxtLink>
            <NuxtLink v-if="rolesChecker(data, 'ROLE_ADMIN')" to="/dashboard/admin/categories" class="nav-item">
                <i class="fas fa-icons fa-lg"></i>
            </NuxtLink>
            <NuxtLink v-if="rolesChecker(data, 'ROLE_ADMIN')" to="/dashboard/admin/plans" class="nav-item">
                <i class="fas fa-list-check fa-lg"></i>
            </NuxtLink>
            <NuxtLink v-if="rolesChecker(data, 'ROLE_ADMIN')" to="/dashboard/admin/invoices" class="nav-item">
                <i class="fas fa-file-lines fa-lg"></i>
            </NuxtLink>
        </nav>
        <div class="content">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup>
const { data } = useAuth()
</script>

<style lang="scss" scoped>
.dashboard{
    display: flex;
    min-height: 100vh;
    
    .sidenav{
        width: 4em;
        box-shadow: var(--box_shadow_light);
        display: flex;
        flex-direction: column;

        .nav-item{
            padding: 1em;
            display: grid;
            place-content: center;
            color: var(--primary);
            text-decoration: none;

            transition: color .5s ease;

            i{
                height: 1.25em;
                line-height: 1;
            }

            &:hover,&.router-link-exact-active{
                color: var(--accent2);
            }

            &:first-of-type{
                margin-top: 1.50rem + 4rem;
            }

            &.--first-admin{
                margin-top: auto;
            }
        }
    }

    .content{
        flex: 1;
        margin-top: 1.50rem + 3rem;
        padding: 1rem;
    }
}
</style>