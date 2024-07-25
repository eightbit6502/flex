<template>
	<v-card class="shadow rounded">

		<v-card-text>
			<v-container>
				<v-row>
					<v-col>
						<v-card-title class="ml-n3">Building Name</v-card-title>
						<v-text-field class="mb-n5" density="compact" v-model="newBuildingStore.newBuilding.name"
							placeholder="Building Name" variant="outlined" required></v-text-field>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>

		<v-card-text class="mt-n8">
			<v-container>
				<v-row>
					<v-col cols="12" md="6">
						<v-card-title class="ml-n3">Address</v-card-title>
						<v-text-field density="compact" v-model="newBuildingStore.newBuilding.addressLine1"
							placeholder="Address Line 1 *" variant="outlined" required></v-text-field>
						<v-text-field class="mt-n2" density="compact"
							v-model="newBuildingStore.newBuilding.addressLine2" placeholder="Address Line 2 *"
							variant="outlined" required></v-text-field>
						<v-text-field class="mt-n2" density="compact" v-model="newBuildingStore.newBuilding.state"
							placeholder="State *" variant="outlined" required></v-text-field>
						<v-row>
							<v-col cols="8">
								<v-text-field class="mt-n2 mr-n1" density="compact"
									v-model="newBuildingStore.newBuilding.country" placeholder="Country *"
									variant="outlined" required></v-text-field>
							</v-col>
							<v-col>
								<v-text-field class="mt-n2 ml-n1" density="compact"
									v-model="newBuildingStore.newBuilding.postcode" placeholder="Postcode *"
									variant="outlined" required></v-text-field>
							</v-col>
						</v-row>
						<v-card-title class="ml-n3">Lat/Long</v-card-title>
						<v-row>
							<v-col>
								<v-text-field class="mr-n1" density="compact"
									v-model="newBuildingStore.newBuilding.latitude" placeholder="Latitude *"
									variant="outlined" required></v-text-field>
							</v-col>
							<v-col>
								<v-text-field class="ml-n1" density="compact"
									v-model="newBuildingStore.newBuilding.longitude" placeholder="Longitude *"
									variant="outlined" required></v-text-field>
							</v-col>
						</v-row>
					</v-col>

					<!-- map view  -->
					<v-col cols="12" md="6">
						<v-card-title class="ml-n3">Map View</v-card-title>
						<GoogleMap api-key="AIzaSyAhBxZ--lkZbICEAPm2gvhVNhJRPrf_tcY" ref="mapRef" class="maps-position"
							:center="center" :zoom="15" :street-view-control="false" :fullscreen-control="false"
							:map-type-control="false">
							<Marker :options="{ position: center }" />
						</GoogleMap>
					</v-col>
				</v-row>
			</v-container>
			<small>*indicates required field</small>
		</v-card-text>

	</v-card>
</template>


<script setup lang="js">
import { ref, watch } from "vue";
import { GoogleMap, Marker } from 'vue3-google-map';
import { useNewBuildingStore } from "@/stores/newBuildingStore";

// stores
const newBuildingStore = useNewBuildingStore();

// refs
const mapRef = ref(null);

// emits


// mapping
let center = ref({
	lat: -33.8567981,
	lng: 151.2152636,
});

const validateAndSetCenter = (lat, lng) => {
	const latitude = parseFloat(lat);
	const longitude = parseFloat(lng);

	if (!isNaN(latitude) && !isNaN(longitude)) {
		center.value = {
			lat: latitude,
			lng: longitude,
		};
	} else {
		// console.error("Invalid latitude or longitude", lat, lng);
	}
};


watch([() => mapRef.value?.ready], ([ready]) => {
	if (!ready) {
		return
	}

	mapRef.value.map.addListener("click", (mapsMouseEvent) => {
		newBuildingStore.newBuilding.latitude = mapsMouseEvent.latLng.lat();
		newBuildingStore.newBuilding.longitude = mapsMouseEvent.latLng.lng();
	})
})



// watch for changes in latitude and longitude in store
watch(
	() => [newBuildingStore.newBuilding.latitude, newBuildingStore.newBuilding.longitude],
	([newLat, newLng]) => {
		validateAndSetCenter(newLat, newLng);
	}
);


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
