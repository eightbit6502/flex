<template>
	<v-row class="mt-8 mb-1" style="padding-left: 5px; padding-right: 8px;">
		<v-col class="d-flex align-items-center">
			<p class="mb-0">
				<span>
					© 2024 Made With
					<span class="heart-filled color-heart" aria-hidden="true"></span>
					By
					<a href="" target="_blank" rel="noopener noreferrer" class="text-primary ms-1">
						Anton Mills
					</a>
				</span>
			</p>
		</v-col>
		<v-spacer></v-spacer>
		<v-col class="d-flex justify-end align-items-center" cols="auto">
			<p class="mb-0">Documentation</p>
		</v-col>
		<v-col class="d-flex justify-end align-items-center" cols="auto">
			<p class="mb-0">Support</p>
		</v-col>
	</v-row>
</template>

<script setup lang="js">
</script>

<style scoped lang="scss">
.heart-filled::before {
	content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='24'%3E%3Cpath fill='red' d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037.033l.034-.03a6 6 0 0 1 4.733-1.44l.246.036a6 6 0 0 1 3.364 10.008l-.18.185l-.048.041l-7.45 7.379a1 1 0 0 1-1.313.082l-.094-.082l-7.493-7.422A6 6 0 0 1 6.979 3.074'/%3E%3C/svg%3E");
}

.color-heart {
	position: relative;
	top: 6px;
}

.v-col {
	padding: 10px !important;
}

p {
	color: rgba(var(--v-font-color-body), 0.5)
}
</style>
