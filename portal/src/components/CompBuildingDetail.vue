<template>
	<v-card class="shadow rounded">

		<!-- building image -->
		<v-row class="building-image-position">
			<v-card-item>
				<v-img :width="220" aspect-ratio="9/16" cover src="/officebuilding2.jpg"></v-img>
				<!-- <v-img :width="220" aspect-ratio="9/16" cover src="/Death_star1.png"></v-img> -->

			</v-card-item>
		</v-row>

		<!-- building title and state -->
		<v-card-item class="building-title">
			<h5>{{ buildingStore.building.name }}</h5>
			<v-chip v-if="buildingStore.building?.status === 'ACTIVE'" class="building-status-active rounded">
				{{ buildingStore.building.status }}
			</v-chip>
			<v-chip v-if="buildingStore.building?.status === 'DISABLED'" class="building-status-archived rounded">
				{{ buildingStore.building.status }}
			</v-chip>
		</v-card-item>

		<!-- building address -->
		<v-card-item class="card-content">
			<p style="font-weight: 600">Address:</p>
			<p>{{ buildingStore.building.addressLine1 }}</p>
			<p>{{ buildingStore.building.addressLine2 }}</p>
			<p>{{ buildingStore.building.state }}</p>
			<p>{{ buildingStore.building.country }}</p>
			<p>{{ buildingStore.building.postcode }}</p>
		</v-card-item>

		<!-- modal for edit building location -->
		<v-dialog transition="scale-transition" max-width="800" v-model="dialogEditLocation">
			<template v-slot:activator="{ props: alertEditLocation }">
				<div class="mr-2 mb-6">
					<v-btn v-if="buildingStore.building?.status === 'ACTIVE'" class="text-none mt-n2"
						v-bind="alertEditLocation" :ripple="false" color="primary" text="Edit Location"
						variant="plain"></v-btn>
				</div>
			</template>
			<v-card>
				<!-- close button -->
				<v-icon class="dialog-close" @click="dialogEditLocation = false">mdi-close</v-icon>
				<v-card-item class="modal-header">
					<p class="modal-heading-text">Edit Locaiton</p>
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

		<!-- building contact details -->
		<v-card-item class="card-content mt-3">
			<p style="font-weight: 600">Contact:</p>
			<p>{{ buildingStore.building.contactName }}</p>
			<a class="card-content-link" :href="'mailto:' + buildingStore.building.contactEmail">{{
				buildingStore.building.contactEmail
			}}</a>
			<a class="card-content-link" :href="'tel:' + buildingStore.building.contactTel">{{
				buildingStore.building.contactTel
			}}</a>
		</v-card-item>

		<!-- modal for edit building contact -->
		<v-dialog transition="scale-transition" max-width="800" v-model="dialogEditContact">
			<template v-slot:activator="{ props: alertEditContact }">
				<div class="mr-2 mb-6">
					<v-btn v-if="buildingStore.building?.status === 'ACTIVE'" class="text-none mt-n2"
						v-bind="alertEditContact" :ripple="false" color="primary" text="Edit Contact"
						variant="plain"></v-btn>
				</div>
			</template>
			<v-card>
				<!-- close button -->
				<v-icon class="dialog-close" @click="dialogEditContact = false">mdi-close</v-icon>
				<v-card-item class="modal-header">
					<p class="modal-heading-text">Edit Contact</p>
					<p class="modal-text">Edit the buildings contact.</p>
				</v-card-item>
				<v-card-text>
					<v-container>
						<v-row>
							<!-- Right Column -->
							<v-col cols="12">
								<v-card-title class="ml-n3">Contact</v-card-title>
								<v-text-field density="compact" v-model="buildingStore.building.contactName"
									placeholder="Contact Name *" variant="outlined" required></v-text-field>
								<v-text-field density="compact" v-model="buildingStore.building.contactEmail"
									placeholder="Contact Email *" variant="outlined" required></v-text-field>
								<v-text-field density="compact" v-model="buildingStore.building.contactTel"
									placeholder="Contact Telephone *" variant="outlined" required></v-text-field>
							</v-col>
						</v-row>
					</v-container>

					<!-- note -->
					<v-row>
						<v-col><small>*indicates required field</small></v-col>
					</v-row>
				</v-card-text>
				<!-- modal action buttons -->
				<v-card-actions class="building-details-buttons">
					<v-spacer></v-spacer>
					<v-btn class="text-none rounded pl-5 pr-5" variant="flat" :ripple="false"
						text="Save Contact Details" color="primary" @click="saveBuildingDetails"></v-btn>
					<v-btn class="text-none rounded pl-5 pr-5" variant="outlined" :ripple="false" text="Cancel"
						color="primary" @click="dialogEditContact = false"></v-btn>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- archive button -->
		<v-row v-if="buildingStore.building?.status === 'ACTIVE'">
			<v-col class="pl-9 pr-9">
				<v-dialog transition="scale-transition" max-width="500" v-model="dialogArchiveBuilding">
					<template v-slot:activator="{ props: alertArchiveBuilding }">
						<v-btn width="100%" v-bind="alertArchiveBuilding" class="text-none rounded mt-2 mb-6"
							variant="outlined" :ripple="false" color="error" prepend-icon="mdi-alert-circle-outline"
							text="Archive Building"></v-btn>
					</template>
					<v-card>
						<v-card-item class="modal-header">
							<svg width="120px" height="120px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M85.57,446.25H426.43a32,32,0,0,0,28.17-47.17L284.18,82.58c-12.09-22.44-44.27-22.44-56.36,0L57.4,399.08A32,32,0,0,0,85.57,446.25Z"
									style="
            fill: none;
            stroke: rgb(var(--v-theme-primary));
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 32px;
            " />
								<path
									d="M250.26,195.39l5.74,122,5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,195.39Z"
									style="
            fill: none;
            stroke: rgb(var(--v-theme-primary));
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 32px;
            " />
								<path d="M256,397.25a20,20,0,1,1,20-20A20,20,0,0,1,256,397.25Z" style="
            fill: rgb(var(--v-theme-primary));
            stroke: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 10px;
            " />
							</svg>
							<p class="warning-text">
								Are you sure you want to archive this building?
							</p>
						</v-card-item>
						<v-card-actions style="padding-bottom: 30px">
							<v-spacer></v-spacer>
							<v-btn class="text-none rounded pl-5 pr-5" variant="outlined" :ripple="false"
								text="Archive Building" color="error" @click="archiveBuilding"></v-btn>
							<v-btn class="text-none rounded pl-5 pr-5" variant="flat" :ripple="false" text="Cancel"
								color="primary" width="100px" @click="dialogArchiveBuilding = false"></v-btn>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
		</v-row>
		<v-row v-if="buildingStore.building?.status === 'DISABLED'">
			<v-col class="pl-9 pr-9">
				<v-dialog transition="scale-transition" max-width="500" v-model="dialogEnableBuilding">
					<template v-slot:activator="{ props: alertArchiveBuilding }">
						<v-btn width="100%" v-bind="alertArchiveBuilding" class="text-none rounded mt-2 mb-6"
							:ripple="false" color="primary" prepend-icon="mdi-alert-circle-outline"
							text="Enable Building"></v-btn>
					</template>

					<v-card>
						<v-card-item class="modal-header">
							<svg width="120px" height="120px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M85.57,446.25H426.43a32,32,0,0,0,28.17-47.17L284.18,82.58c-12.09-22.44-44.27-22.44-56.36,0L57.4,399.08A32,32,0,0,0,85.57,446.25Z"
									style="
            fill: none;
            stroke: rgb(var(--v-theme-primary));
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 32px;
            " />
								<path
									d="M250.26,195.39l5.74,122,5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,195.39Z"
									style="
            fill: none;
            stroke: rgb(var(--v-theme-primary));
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 32px;
            " />
								<path d="M256,397.25a20,20,0,1,1,20-20A20,20,0,0,1,256,397.25Z" style="
            fill: rgb(var(--v-theme-primary));
            stroke: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 10px;
            " />
							</svg>
							<p>
								Are you sure you want to make this building
								active?
							</p>
						</v-card-item>
						<v-card-actions style="padding-bottom: 30px">
							<v-spacer></v-spacer>
							<v-btn class="text-none rounded pl-5 pr-5" variant="outlined" :ripple="false"
								text="Enable Building" color="primary" @click="enableBuilding"></v-btn>
							<v-btn class="text-none rounded pl-5 pr-5" variant="flat" :ripple="false" text="Cancel"
								color="primary" width="100px" @click="dialogEnableBuilding = false"></v-btn>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
		</v-row>
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

// dialog's
const dialogEditLocation = ref(false);
const dialogEditContact = ref(false);
const dialogArchiveBuilding = ref(false);
const dialogEnableBuilding = ref(false);

// emits
const emit = defineEmits(['update-building', 'enable-building', 'archive-building']);

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

// emitted when the building is archived
const archiveBuilding = () => {
	dialogArchiveBuilding.value = false;

	emit('archive-building');
}

// emitted when the building is enabled
const enableBuilding = () => {
	dialogEnableBuilding.value = false;

	emit('enable-building');
}

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
}

.building-status-active {
	margin-top: 10px;
	font-size: 11px;
	color: rgb(var(--v-font-color-body)); //todo compute based on state
}

.building-status-archived {
	margin-top: 10px;
	font-size: 11px;
	color: rgb(var(--v-theme-error)); //todo compute based on state
}

.maps-position {
	width: 100%;
	// height: 100%;
	// height: calc(255px - 40px);
	height: calc(100% - 50px);
	// margin-top: 50px;
}

.building-image-position {
	// align-items: center;
	justify-content: center;
	margin-top: 40px;
}

.card-content {
	color: rgb(var(--v-theme-primary)) !important;
	display: block;
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
