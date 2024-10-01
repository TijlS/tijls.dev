<template>
	<div class="container">
		<h1>
			Dit is een <span class="text-secondary">hele lange</span> tekst met
			soms wat <span class="text-tertiary">kleur</span>.
		</h1>
		<div class="showcase">
			<div v-for="style in styles.styles" class="style">
				<div class="--name">
					{{ style !== "" ? style : "normal" }}
				</div>
				<div class="buttons">
					<button
						v-for="color in styles.colors"
						:class="[
							'btn',
							`btn-${color}`,
							style ? `btn-${style}` : '',
						]"
					>
						{{ color }} {{ style ? `${style}` : "" }}
					</button>
				</div>
			</div>
		</div>
        <br><br><br>
		<h1>
            <span class="text-accent-primary">
                En hier is een tekst mét accent!
            </span>
		</h1>
        <h1>
            Of zelfs met <span class="text-accent-secondary">meerdere</span> <span class="text-accent-tertiary">accenten</span>! <br>
            Er is ook nog <span class="text-accent-accent1">deze</span> en <span class="text-accent-accent2">deze</span>.
        </h1>
	</div>
</template>

<style lang="scss" scoped>
.showcase {
	display: flex;
	width: 100%;
	gap: 1em;
	flex-direction: column;
	padding: 0 5em;

	.style {
		display: flex;
		align-items: center;

		.--name {
			width: 15%;
			font-weight: bold;
			font-size: 2em;
		}
		.buttons {
			flex: 1;

			display: flex;
			gap: 1em;
		}
	}
}
</style>

<script setup>
definePageMeta({
	auth: false
})

const styles = ref({
	colors: ["primary", "secondary", "tertiary", "accent1", "accent2", "success", "error", "info", "warning"],
	styles: ["", "outline"],
});
</script>
