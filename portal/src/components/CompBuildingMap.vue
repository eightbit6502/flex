<template>

	<!-- map tile -->
	<v-card class="shadow rounded mt-5">
		<v-row>
			<GoogleMap api-key="AIzaSyAhBxZ--lkZbICEAPm2gvhVNhJRPrf_tcY" class="maps-position mt-n3" :center="center"
				:zoom="12" :street-view-control="false" :fullscreen-control="false" :map-type-control="false">
				<Marker :options="{ position: center }" />
			</GoogleMap>
		</v-row>
	</v-card>


	<!-- map address and update modal -->
	<v-card class="shadow rounded mt-5">

		<!-- building address -->
		<v-card-item class="card-content">
			<h5 class="card-title" style="font-weight: 500;">Address</h5>
			<p>{{ buildingStore.building.addressLine1 }}</p>
			<p>{{ buildingStore.building.addressLine2 }}</p>
			<p>{{ buildingStore.building.state }}</p>
			<p>{{ buildingStore.building.country }}</p>
			<p>{{ buildingStore.building.postcode }}</p>
		</v-card-item>


		<v-card-item class="card-content">
			<h5 class="card-title" style="font-weight: 500;">Coordinates</h5>
			<p>{{ buildingStore.building.latitude }}, {{ buildingStore.building.longitude }}</p>
		</v-card-item>

		<!-- modal for edit building location -->
		<v-dialog transition="scale-transition" max-width="800" v-model="dialogEditLocation">
			<template v-slot:activator="{ props: alertEditLocation }">
				<v-btn v-if="buildingStore.building?.status === 'ACTIVE'" class="text-none edit-pos"
					v-bind="alertEditLocation" :ripple="false" color="primary" text="Edit" variant="plain"></v-btn>
			</template>
			<v-card>
				<!-- close button -->
				<v-icon class="dialog-close" @click="dialogEditLocation = false">mdi-close</v-icon>
				<v-card-item class="modal-header">
					<p class="modal-heading-text">Edit Location</p>
					<p class="modal-text">Edit the buildings location.</p>
				</v-card-item>
				<v-card-text>
					<v-container>
						<v-row>
							<!-- textifields -->
							<v-col cols="12" md="6">
								<v-card-title class="ml-n3">Address</v-card-title>
								<v-text-field density="compact" v-model="buildingStore.building.addressLine1"
									placeholder="Address Line 1 *" variant="outlined" required></v-text-field>
								<v-text-field class="mt-n2" density="compact"
									v-model="buildingStore.building.addressLine2" placeholder="Address Line 2 *"
									variant="outlined" required></v-text-field>
								<v-text-field class="mt-n2" density="compact" v-model="buildingStore.building.state"
									placeholder="State *" variant="outlined" required></v-text-field>
								<v-row>
									<v-col cols="8">
										<v-text-field class="mt-n2 mr-n1" density="compact"
											v-model="buildingStore.building.country" placeholder="Country *"
											variant="outlined" required></v-text-field>
									</v-col>
									<v-col>
										<v-text-field class="mt-n2 ml-n1" density="compact"
											v-model="buildingStore.building.postcode" placeholder="Postcode *"
											variant="outlined" required></v-text-field>
									</v-col>
								</v-row>
								<v-card-title class="ml-n3">Lat/Long</v-card-title>
								<v-row>
									<v-col>
										<v-text-field class="mr-n1" density="compact"
											v-model="buildingStore.building.latitude" placeholder="Latitude *"
											variant="outlined" required></v-text-field>
									</v-col>
									<v-col>
										<v-text-field class="ml-n1" density="compact"
											v-model="buildingStore.building.longitude" placeholder="Longitude *"
											variant="outlined" required></v-text-field>
									</v-col>
								</v-row>
							</v-col>


							<!-- map view  -->
							<v-col cols="12" md="6">
								<v-card-title class="ml-n3">Map View</v-card-title>
								<GoogleMap api-key="AIzaSyAhBxZ--lkZbICEAPm2gvhVNhJRPrf_tcY" ref="mapRef"
									class="maps-position" :center="center" :zoom="15" :street-view-control="false"
									:fullscreen-control="false" :map-type-control="false">
									<Marker :options="{ position: center }" />
								</GoogleMap>
							</v-col>
						</v-row>
					</v-container>
					<small>*indicates required field</small>
				</v-card-text>

				<!-- buttons on the location modal -->
				<v-card-actions class="building-details-buttons">
					<v-spacer></v-spacer>
					<v-btn class="text-none rounded pl-5 pr-5" variant="flat" :ripple="false"
						text="Save Location Details" color="primary" @click="saveBuildingDetails"></v-btn>
					<v-btn class="text-none rounded pl-5 pr-5" variant="outlined" :ripple="false" text="Cancel"
						color="primary" @click="dialogEditLocation = false"></v-btn>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>



</template>


<script setup lang="js">
import { ref, watch } from "vue";
import { GoogleMap, Marker } from 'vue3-google-map'
import { useBuildingStore } from "../stores/buildingStore";

// store
const buildingStore = useBuildingStore();

// refs
const mapRef = ref(null);
const mapRef2 = ref(null);

// dialog's
const dialogEditLocation = ref(false);
const dialogEditContact = ref(false);
const dialogArchiveBuilding = ref(false);
const dialogEnableBuilding = ref(false);

// emits
const emit = defineEmits(['update-building']);

// mapping
let center = ref({
	lat: 0.0,
	lng: 0.0,
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


// watch for changes in latitude and longitude in store
watch(
	() => [buildingStore.building.latitude, buildingStore.building.longitude],
	([newLat, newLng]) => {
		validateAndSetCenter(newLat, newLng);
	}
);

// update lat/lng based on users click
watch([() => mapRef.value?.ready], ([ready]) => {
	if (!ready) {
		return
	}

	mapRef.value.map.addListener("click", (mapsMouseEvent) => {
		buildingStore.building.latitude = mapsMouseEvent.latLng.lat();
		buildingStore.building.longitude = mapsMouseEvent.latLng.lng();
	})
})


// emits --------------------

// emitted when saving the building state
const saveBuildingDetails = () => {
	dialogEditLocation.value = false;
	dialogEditContact.value = false;

	emit('update-building');
}
</script>


<style scoped lang="scss">
// detail pane
.building-title {
	justify-content: center;
	text-align: center;
}

.building-title h5 {
	font-size: var(--v-font-size-h5) !important;
}

.building-title :deep(.v-chip) {
	padding: 8px;
	height: 22px;
	margin-top: -20px !important;
}

.building-status-active {
	// margin-top: 10px;
	font-size: 11px;
	color: rgb(var(--v-font-color-body)); //todo compute based on state
}

.building-status-archived {
	// margin-top: 10px;
	font-size: 11px;
	color: rgb(var(--v-theme-error)); //todo compute based on state
}

.edit-pos {

	position: absolute;
	top: 15px;
	right: 10px;
	text-align: right;
}

.maps-position {
	width: 100%;
	height: 282px;
	// height: calc(255px - 40px);
	// height: calc(100% - 50px);
	// margin-top: 50px;
}

.building-image-position {
	// align-items: center;
	justify-content: center;
	margin-top: 40px;
}

.card-title {
	padding-bottom: 10px;
}

.card-content {
	color: rgb(var(--v-theme-primary)) !important;
	display: block;

	padding-top: 20px;
	padding-left: 20px;
	padding-bottom: 15px;
}


// modal windows
.modal-header {
	text-align: center;
	margin-top: 20px;
}

.modal-heading-text {
	font-size: 24px;
	font-weight: 500;
}

.dialog-close {
	position: absolute;
	top: 20px;
	right: 20px;
	cursor: pointer;
}

.warning-text {
	font-size: 18px;
	font-weight: 500;
	padding-top: 30px;
	padding-bottom: 0px;
}

.building-details-buttons {
	margin-bottom: 20px;
}

.card-content-link {
	color: rgb(var(--v-theme-primary)) !important;
	display: block;
	text-decoration: none;
}
</style>
