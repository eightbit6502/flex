<template>
	<v-card class="mx-auto base shadow rounded">

		<v-row class="image-align">
			<v-card-item>
				<v-img :width="220" aspect-ratio="9/16" cover src="/officebuilding2.jpg"></v-img>
			</v-card-item>
		</v-row>


		<v-card-item class="building-title">
			<h5>{{ buildingStore.building.name }}</h5>
			<v-chip>{{ buildingStore.building.status }}</v-chip>
		</v-card-item>


		<v-card-item class="card-content">
			<v-row>
				<v-col>
					<v-col>
						<h5>{{ buildingStore.building.totalSites }}</h5>
						<p>Sites</p>
					</v-col>
				</v-col>

				<v-col>
					<h5>{{ buildingStore.building.totalTenants }}</h5>
					<p>Tenants</p>
				</v-col>
			</v-row>

		</v-card-item>

		<v-card-item class="card-content">
			<h4>Details</h4>
		</v-card-item>
		<hr />

		<v-card-item class="card-content">
			<p>Address:</p>
			<p>{{ buildingStore.building.addressLine1 }}</p>
			<p>{{ buildingStore.building.addressLine2 }}</p>
			<p>{{ buildingStore.building.state }}</p>
			<p>{{ buildingStore.building.country }}</p>
			<p>{{ buildingStore.building.postcode }}</p>
		</v-card-item>

		<v-row>
			<v-col>
				<v-btn color="surface-variant" text="Edit" variant="flat"></v-btn>
			</v-col>
			<v-col>
				<v-dialog max-width="500">
					<template v-slot:activator="{ props: alertArchiveBuilding }">
						<v-btn v-bind="alertArchiveBuilding" color="warning" text="Archive" variant="flat"></v-btn>
					</template>

					<template v-slot:default="{ isActive }">
						<v-card>
							<v-card-item>
								<h4>Are you sure?</h4>
							</v-card-item>

							<v-card-actions>
								<v-spacer></v-spacer>

								<v-btn text="Yes, Archive!" @click="isActive.value = false"></v-btn>
								<v-btn text="Cancel" @click="isActive.value = false"></v-btn>
							</v-card-actions>
						</v-card>
					</template>
				</v-dialog>
			</v-col>
		</v-row>

	</v-card>
</template>



<!-- script -->
<script setup lang="ts">

import { useBuildingStore } from '../stores/buildingStore';

const buildingStore = useBuildingStore();

</script>



<!-- style -->
<style scoped lang="scss">
.base {
	height: 732px;
}


.card-title {
	padding-top: 20px;
	padding-left: 16px;
	padding-bottom: 0px;
}

.image-align {
	// align-items: center;
	justify-content: center;
	margin-top: 10px;
}

.building-title {
	justify-content: center;
}

// .v-icon {
//   background-color: rgba(105, 105, 255, 0.2);
//   border-radius: 10px;
//   // padding: 20px;
// }

.card-content {}

.text-content {
	// padding: 20px 16px;
}

.carousel {
	width: 250px !important;
	height: 350px !important;
}
</style>
