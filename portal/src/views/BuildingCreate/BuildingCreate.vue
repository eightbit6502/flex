<template>
	<!-- reusable snackbar -->
	<v-snackbar :color="snackbarColor" v-model="snackbarShow">
		{{ snackbarText }}
	</v-snackbar>

	<!-- view layout -->
	<v-layout>

		<!-- navigation -->
		<CompNavBar></CompNavBar>

		<!-- content -->
		<v-main class="bg">
			<div class="body-position-fix">
				<div class="content-wrapper">
					<CompAppBar class="app-bar-position"></CompAppBar>

					<!-- heading -->
					<div>
						<v-row>
							<v-col>
								<h4>Create Building</h4>
								<p class=" mb-3">Enter Building details</p>
							</v-col>
							<v-spacer></v-spacer>
							<v-col style="text-align: right; align-content: center;">
								<v-btn class="add-button text-none" prepend-icon="mdi-plus" color="primary"
									:ripple="false" text="Add Building" @click="createBuilding"
									:disabled="!isAddButtonEnabled"></v-btn>
							</v-col>
						</v-row>
					</div>

					<!--  -->
					<v-row>
						<v-col cols="4">
							<PaneBuildingAddImage style="margin-bottom: 26px;"></PaneBuildingAddImage>
							<PaneBuildingAddContact></PaneBuildingAddContact>
						</v-col>

						<v-col cols="8">
							<PaneBuildingAddAddress></PaneBuildingAddAddress>
						</v-col>
					</v-row>

					<!-- footer -->
					<CompFooter></CompFooter>
				</div>
			</div>
		</v-main>
	</v-layout>
</template>


<script setup lang="js">
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import router from '@/router/index'
import { useNewBuildingStore } from "@/stores/newBuildingStore";
import { createBuildingData } from "@/services/buildingService";

import PaneBuildingAddImage from './PaneBuildingAddImage.vue';
import PaneBuildingAddContact from './PaneBuildingAddContact.vue';
import PaneBuildingAddAddress from './PaneBuildingAddAddress.vue';

// stores
const newBuildingStore = useNewBuildingStore();

// route, breadcrumbs and building Id (used in routing)
const breadcrumbs = ref([]);
const route = useRoute();

const apiLoading = ref(false);

const snackbarShow = ref(false);
const snackbarText = ref("");
const snackbarIsError = ref(false); // boolean to determine the color

// computed property to determine the color
const snackbarColor = computed(() => {
	return snackbarIsError.value ? 'rgb(var(--v-theme-error))' : 'rgb(var(--v-theme-primary))';
});

// data


// update breadcrumbs
watch(
	() => route.params.id,
	(newId) => {
		if (newId) {
			breadcrumbs.value = [
				{
					title: "Building",
					disabled: false,
					href: "/building",
				},
				{
					title: a,
					disabled: true,
					href: `/building/${newId}`,
				},
			];
		}
	},
	{ immediate: true }
);


// check data in form
const isAddButtonEnabled = computed(() => {
	const newBuilding = newBuildingStore.newBuilding;

	// check if name is filled
	const isNameFilled = newBuilding.name !== "";

	// check if address1, state, country, and postcode are all filled
	// const isAddressFilled = newBuilding.address1 !== "" &&
	// 	newBuilding.state !== "" &&
	// 	newBuilding.country !== "" &&
	// 	newBuilding.postcode !== "";

	// check if lat and lng are both filled
	const isLatLngFilled = newBuilding.latitude !== "" && newBuilding.longitude !== "";

	// enable button if name is filled and either address or lat/lng is filled
	// return isNameFilled && (isAddressFilled || isLatLngFilled);
	return isNameFilled && isLatLngFilled;
});




// data / service integrations --------------

const createBuilding = async () => {
	try {
		await createBuildingData(newBuildingStore.newBuilding);

		apiLoading.value = true;

		snackbarText.value = "Building created";
		snackbarIsError.value = false;
		snackbarShow.value = true;

		apiLoading.value = false;

		router.push({ path: '/building' });

	} catch (error) {
		console.error("Failed to create building:", error);
	}
};


onMounted(async () => {
	// fetchBuildingData();
	// fetchBuildingTenants();
	// fetchBuildingSites();
	// fetchBuildingRecentChanges();

});
</script>




<style scoped lang="scss">
// core styles

.body-position-fix {
	display: flex;
	justify-content: center;
}

.content-wrapper {
	width: 96%;
	max-width: var(--v-max-body-width);
}

.app-bar-position {
	margin-bottom: var(--v-spacing-appbar-offset);
}

.flex-container {
	padding-top: 5px;

	display: flex;
	gap: 16px;
	width: 100%;
}


// reusable window title
.card-title {
	padding-top: 20px;
	padding-left: 16px;
	padding-bottom: 0px;
}

.card-content {
	color: rgb(var(--v-theme-primary)) !important;
	display: block;
}

.card-content-link {
	color: rgb(var(--v-theme-primary)) !important;
	display: block;
	text-decoration: none;
}


// modal window
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

.modal-header {
	text-align: center;
	margin-top: 20px;
}



// --------------- below are unique to view -----------------



// menu / tab buttons
.right-col-style button {
	margin-right: 10px;
}

// for filters
.search-input {
	max-width: 230px;
	height: 40px;
}

.btn-text {
	color: rgb(var(--v-font-color-body)) !important;
}
</style>
