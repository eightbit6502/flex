<template>
	<v-card class="shadow rounded">

		<v-card-text>
			<v-container>
				<v-row>
					<v-col>
						<v-card-title class="ml-n3">Building Contact</v-card-title>
						<v-text-field class="mb-n2" density="compact" v-model="newBuildingStore.newBuilding.contactName"
							placeholder="Contact Name" variant="outlined" required></v-text-field>
						<v-text-field class="mb-n2" density="compact" v-model="newBuildingStore.newBuilding.contactTel"
							placeholder="Contact Telephone" variant="outlined" required></v-text-field>
						<v-text-field class="mb-n2" density="compact"
							v-model="newBuildingStore.newBuilding.contactEmail" placeholder="Contact Mobile"
							variant="outlined" required></v-text-field>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>

	</v-card>
</template>


<script setup lang="js">
import { ref, watch, defineModel } from "vue";
import { useNewBuildingStore } from "@/stores/newBuildingStore";

// stores
const newBuildingStore = useNewBuildingStore();

// props

// refs

// emits

// model





// emits --------------------



</script>


<style scoped lang="scss">
// detail pane
.card-title {
	color: rgb(var(--v-theme-primary)) !important;
	display: block;
	margin-left: 15px;
}

.card-content {
	color: rgb(var(--v-theme-primary)) !important;
	display: block;
}


.maps-position {
	width: 100%;
	// height: 100%;
	// height: calc(255px - 40px);
	height: calc(100% - 50px);
	// margin-top: 50px;
}
</style>
