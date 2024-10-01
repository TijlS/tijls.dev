<template>
	<div class="plans">
		<div class="title">
			<h1>Abonnementen</h1>
			<div class="actions">
				<button
					class="btn btn-success btn-icon"
					@click="addPlanModalOpen = true"
				>
					<i class="fas fa-plus"></i>
				</button>
			</div>
		</div>
		<table class="table striped fixed">
			<thead>
				<tr>
					<th>Naam</th>
					<th>Beschrijving</th>
					<th>Type</th>
					<th>Prijs</th>
					<th>Betalingstype</th>
					<th>Categoriën</th>
					<th>Zichtbaar</th>
					<th>Acties</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="plan in plans" :key="plan.id">
					<td>{{ plan.name }}</td>
					<td>{{ plan.description }}</td>
					<td>{{ plan.type }}</td>
					<td>€{{ parseFloat(plan.price / 100).toFixed(2).replace('.', ',') }}</td>
					<td>{{ plan.paymentType }}</td>
					<td>{{ plan.categories }}</td>
					<td class="center"><i :class="`fas fa-${plan.visible ? 'check' : 'times'} fa-lg`"></i></td>
					<td class="space">
						<button class="btn btn-tertiary btn-icon">
							<i class="fas fa-pencil"></i>
						</button>
						<button class="btn btn-secondary btn-icon">
							<i class="fas fa-arrow-up-right-from-square"></i>
						</button>
						<button class="btn btn-warning btn-icon">
							<i class="fas fa-eye"></i>
						</button>
						<button class="btn btn-error btn-icon" @click="deletePlan(plan.id)">
							<i class="fas fa-trash"></i>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		<Modal :isOpen="addPlanModalOpen" @close="addPlanModalOpen = false">
			<h1>Abonnement toevoegen</h1>
			<form @submit.prevent="addPlan">
                <div class="input-container">
                    <label for="nameInput">Naam</label>
                    <input required v-model="addPlanData.name" type="text" id="nameInput" />
                </div>
                <div class="input-container">
                    <label for="descriptionInput">Beschrijving</label>
                    <textarea required v-model="addPlanData.description" id="descriptionInput"></textarea>
                </div>
                <div class="input-container">
                    <label for="priceInput">Prijs</label>
                    <input required v-model="addPlanData.price" type="number" step="0.01" id="priceInput">
                </div>
                <div class="input-container">
                    <label for="typeInput">Type</label>
                    <div class="select-container">
                        <select v-model="addPlanData.type" id="typeInput">
                            <option value="GENERAL">Publiek</option>
                            <option value="CUSTOM">Aangepast</option>
                        </select>
                    </div>
                </div>
                <div class="input-container">
                    <label for="paymentTypeInput">Betalingstype</label>
                    <div class="select-container">
                        <select v-model="addPlanData.paymentType" id="paymentTypeInput">
                            <option value="MONTHLY">Maandelijks</option>
                            <option value="YEARLY">Jaarlijks</option>
                            <option value="VARIABLE">Beide</option>
                        </select>
                    </div>
                </div>
                <div class="input-container">
                    <label for="isVisibleInput">Zichtbaar</label>
                    <input v-model="addPlanData.visible" type="checkbox" id="isVisibleInput" />
                </div>
                <button type="submit" class="btn btn-success btn-outline btn-fw">Toevoegen</button>
			</form>
		</Modal>
	</div>
</template>

<script setup>
const { data: plans, refresh: refreshData } = await useFetch(
    "/api/prisma/plan/all"
);

const addPlanModalOpen = ref(false);
const addPlanData = ref({
    name: '',
    description: '',
    price: 0,
    type: '',
    paymentType: '',
    visible: false
})
const addPlan = async () => {
    const postData = {
        name: addPlanData.value.name,
        description: addPlanData.value.description,
        price: addPlanData.value.price * 100,
        type: addPlanData.value.type,
        paymentType: addPlanData.value.paymentType,
        visible: addPlanData.value.visible
    }

    const result = await $fetch('/api/prisma/plan', {
        method: 'POST',
        body: postData
    })

    if(result.state == "success"){
        refreshData()
        addPlanModalOpen.value = false
    }
}

const deletePlan = async (id) => {
    const result = await $fetch('/api/prisma/plan', {
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

<style lang="scss" scoped>
.plans {
	.title {
		display: flex;
		align-items: center;
		margin-bottom: 30px;

		h1 {
			margin-bottom: 0;
		}

		.actions {
			margin-left: auto;
		}
	}
}
</style>
