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

					<!-- breadcrumbs -->
					<v-row>
						<v-breadcrumbs style="padding-bottom: 0px; padding-top: 20px" :items="breadcrumbs"
							divider="/"></v-breadcrumbs>
					</v-row>

					<v-row>
						<v-col class="building-title" style="padding-top: 5px; margin-bottom: 20px;">
							<h4>{{ buildingStore.building?.name }}</h4>
							<v-chip v-if="buildingStore.building?.status === 'ACTIVE'"
								class="building-status-active rounded">
								{{ buildingStore.building.status }}
							</v-chip>
							<v-chip v-if="buildingStore.building?.status === 'DISABLED'"
								class="building-status-archived rounded">
								{{ buildingStore.building.status }}
							</v-chip>
						</v-col>
					</v-row>

					<div class="d-flex">
						<v-row>
							<!-- I want to see this col first on anything larger than mobile  -->
							<v-col cols="12" md="3" class="order-2 order-md-1">
								<CompBuildingImage></CompBuildingImage>
								<CompBuildingMap @update-building="saveBuildingDetails"></CompBuildingMap>
							</v-col>

							<!-- I want to see this first on mobile -->
							<v-col cols="12" md="9" class="order-1 order-md-2 right-col-style">
								<v-row>
									<v-col>
										<v-btn class="add-button text-none rounded btn-text" variant="text"
											:ripple="false" prepend-icon="mdi-view-dashboard-outline" text="Overview"
											:to="'/building/' + buildingId"></v-btn>
										<v-btn class="add-button text-none rounded" :ripple="false"
											prepend-icon="mdi-cog-outline" text="Settings" color="primary"></v-btn>
										<v-btn class="add-button text-none rounded btn-text" :ripple="false"
											prepend-icon="mdi-database-outline" variant="text" text="Logs"
											:to="'/building/' + buildingId + '/logs'"></v-btn>
									</v-col>
								</v-row>

								<!-- Building Logs -->
								<PaneBuildingSettings :loading="apiLoading" :logs="buildingLogs"
									@update-logs="fetchBuildingLogs"></PaneBuildingSettings>
							</v-col>
						</v-row>
					</div>

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
import { useBuildingStore } from "@/stores/buildingStore";
import { getBuildingData, updateBuildingData } from "@/services/buildingService";
import { getBuildingLogs } from "@/services/logService";

import PaneBuildingSettings from './PaneBuildingSettings.vue';

// stores
const buildingStore = useBuildingStore();

// route, breadcrumbs and building Id (used in routing)
const breadcrumbs = ref([]);
const route = useRoute();
const buildingId = route.params.id;

const apiLoading = ref(false);

const snackbarShow = ref(false);
const snackbarText = ref("");
const snackbarIsError = ref(false); // boolean to determine the color

// computed property to determine the color
const snackbarColor = computed(() => {
	return snackbarIsError.value ? 'rgb(var(--v-theme-error))' : 'rgb(var(--v-theme-primary))';
});

// data
const buildingLogs = ref([]);

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
					title: newId,
					disabled: false,
					href: `/building/${newId}`,
				},
				{
					title: "Settings",
					disabled: true,
					href: `/building/${newId}/settings`,
				}
			];
		}
	},
	{ immediate: true }
);


// data / service integrations --------------

const fetchBuildingData = async () => {
	try {
		apiLoading.value = true;
		const response = await getBuildingData(buildingId);

		// store building data locally and set to store
		buildingStore.setBuilding(response.building || []);

		apiLoading.value = false;

	} catch (error) {
		console.error("Failed to fetch building data:", error);
	}
}

const fetchBuildingLogs = async (payload) => {
	try {
		apiLoading.value = true;

		buildingLogs.value = [];
		const response = await getBuildingLogs(buildingId, payload);

		// store building data locally and set to store
		buildingLogs.value = response.logs || [];

		apiLoading.value = false;
	} catch (error) {
		console.error("Failed to fetch building logs:", error);
	}
};

const saveBuildingDetails = async () => {
	try {
		await updateBuildingData(buildingStore.building);

		snackbarText.value = "Building updated";
		snackbarIsError.value = false;
		snackbarShow.value = true;

		// refresh ui
		fetchBuildingRecentChanges();

	} catch (error) {
		console.error("Failed to update building details:", error);
	}
};




onMounted(async () => {
	fetchBuildingData();
	fetchBuildingLogs();
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


.building-title {}

.building-title h4 {
	display: inline;
	font-size: var(--v-font-size-h4) !important;
}

.building-title :deep(.v-chip) {
	// display: inline;
	margin-left: 15px;
	margin-top: -8px;
	height: 22px;

	padding: 5px 15px;
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
	// padding-top: 30px;
	// padding-bottom: 0px;
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


.dt_value {
	font-size: var(--v-font-size-p);
	color: rgb(var(--v-font-color-body));
}

.dt_value a:hover {
	color: rgb(var(--v-theme-primary));
}

.dt_value_link {
	text-decoration: none;
	color: inherit;
}


// menu / tab buttons
.right-col-style button {
	// margin-right: 4px;
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
