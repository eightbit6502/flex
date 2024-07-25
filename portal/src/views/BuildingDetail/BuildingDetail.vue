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
							<h4>{{ buildingData.name }}</h4>
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
										<v-btn class="add-button text-none rounded" color="primary" :ripple="false"
											prepend-icon="mdi-view-dashboard-outline" text="Overview"></v-btn>
										<v-btn class="add-button text-none rounded btn-text" variant="text"
											:ripple="false" prepend-icon="mdi-cog-outline" text="Settings"
											:to="'/building/' + buildingId + '/settings'"></v-btn>
										<v-btn class="add-button text-none rounded btn-text" variant="text"
											:ripple="false" prepend-icon="mdi-database-outline" text="Logs"
											:to="'/building/' + buildingId + '/logs'"></v-btn>
									</v-col>
								</v-row>

								<!-- Building Tenants -->
								<PaneBuildingTenants :loading="apiLoading" @get-other-tenants="getOtherTenants"
									@add-tenant="addTenantToBuilding" @remove-tenant="removeTenantFromBuilding">
								</PaneBuildingTenants>

								<!-- Building Sites -->
								<PaneBuildingSites :loading="apiLoading" @get-other-sites="getOtherSites"
									@add-site="addSiteToBuilding" @remove-site="removeSiteFromBuilding">
								</PaneBuildingSites>

								<!-- Recent Changes -->
								<PaneBuildingTimeline></PaneBuildingTimeline>
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
import { useBuildingTenantsStore } from "@/stores/buildingTenantsStore";
import { useBuildingSitesStore } from "@/stores/buildingSitesStore";
import { getBuildingData, updateBuildingData } from "@/services/buildingService";
import { getBuildingTenants, addBuildingTenant, removeBuildingTenant } from "@/services/buildingTenantService";
import { getBuildingSites, addBuildingSite, removeBuildingSite } from "@/services/buildingSiteService";
import { getAllTenantData } from "@/services/tenantService";
import { getAllSiteData } from "@/services/siteService";
import { getRecentBuildingLogs } from "@/services/logService";

import PaneBuildingTenants from "./PaneBuildingTenants.vue";
import PaneBuildingSites from "./PaneBuildingSites.vue";
import PaneBuildingTimeline from "./PaneBuildingTimeline.vue";


// stores
const buildingStore = useBuildingStore();
const buildingTenantsStore = useBuildingTenantsStore();
const buildingSitesStore = useBuildingSitesStore();

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
const buildingData = ref([]);

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
					disabled: true,
					href: `/building/${newId}`,
				},
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
		buildingData.value = response.building || [];
		buildingStore.setBuilding(response.building || []);

		apiLoading.value = false;

	} catch (error) {
		console.error("Failed to fetch building data:", error);
	}
}

const fetchBuildingRecentChanges = async () => {
	try {
		apiLoading.value = true;
		const response = await getRecentBuildingLogs(buildingId);

		// store building data locally and set to store
		buildingStore.setBuildingChanges(response.logs || []);

		apiLoading.value = false;

	} catch (error) {
		console.error("Failed to fetch building recent changes:", error);
	}
}



const archiveBuilding = async () => {
	try {
		buildingStore.building.status = "DISABLED";

		await updateBuildingData(buildingStore.building);

		snackbarText.value = "Building archived";
		snackbarIsError.value = false;
		snackbarShow.value = true;

		// ensure the server accepted the status change
		// await fetchBuildingData();

	} catch (error) {
		buildingStore.building.status = "ACTIVE";

		snackbarText.value = "Failed to archive Building";
		snackbarIsError.value = true;
		snackbarShow.value = true;

		console.error("Failed to archive building:", error);
	}
};

const enableBuilding = async () => {
	try {
		buildingStore.building.status = "ACTIVE";

		await updateBuildingData(buildingStore.building);

		snackbarText.value = "Building enabled";
		snackbarIsError.value = false;
		snackbarShow.value = true;

	} catch (error) {
		console.error("Failed to enable building:", error);
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



const fetchBuildingTenants = async () => {
	try {
		apiLoading.value = true;

		const response = await getBuildingTenants(buildingId);
		buildingTenantsStore.setBuildingTenants(response.tenants.map((buildingTenant) => buildingTenant.Tenant));

		apiLoading.value = false;
	} catch (error) {
		console.error("Failed to fetch building tenants:", error);
	}
}

const getOtherTenants = async () => {
	try {
		apiLoading.value = true;

		const response = await getAllTenantData();
		buildingTenantsStore.setOtherTenants(response.tenant);

		apiLoading.value = false;
	} catch (error) {
		console.error("Failed to fetch tenants:", error);
	}
};

const addTenantToBuilding = async (tenantId) => {
	try {
		apiLoading.value = true;

		const data = await addBuildingTenant(buildingId, tenantId);

		apiLoading.value = false;

		snackbarText.value = "Tenant added";
		snackbarIsError.value = false;
		snackbarShow.value = true;

		// reloads the tenant list and recent changes
		fetchBuildingTenants();
		fetchBuildingRecentChanges();

	} catch (error) {
		console.error("Failed to add tenant:", error);
	}
}

const removeTenantFromBuilding = async (tenantId) => {
	try {
		apiLoading.value = true;

		console.log(tenantId)
		const data = await removeBuildingTenant(buildingId, tenantId);

		snackbarText.value = "Tenant removed";
		snackbarIsError.value = false;
		snackbarShow.value = true;

		apiLoading.value = false;

		// reloads the tenant list for display and recent changes
		fetchBuildingTenants();
		fetchBuildingRecentChanges();

	} catch (error) {
		console.error("Failed to add tenant:", error);
	}
}



const fetchBuildingSites = async () => {
	try {
		apiLoading.value = true;

		const response = await getBuildingSites(buildingId);
		buildingSitesStore.setBuildingSites(response.sites.map((buildingSite) => buildingSite.Site));

		apiLoading.value = false;
	} catch (error) {
		console.error("Failed to fetch building sites:", error);
	}
}

const getOtherSites = async () => {
	try {
		apiLoading.value = true;

		const response = await getAllSiteData();
		buildingSitesStore.setOtherSites(response.site);

		apiLoading.value = false;
	} catch (error) {
		console.error("Failed to fetch sites:", error);
	}
};

const addSiteToBuilding = async (siteId) => {
	try {
		apiLoading.value = true;

		const data = await addBuildingSite(buildingId, siteId);

		apiLoading.value = false;

		snackbarText.value = "Site added";
		snackbarIsError.value = false;
		snackbarShow.value = true;

		// reloads the site list for display and recent changes
		fetchBuildingSites();
		fetchBuildingRecentChanges();

	} catch (error) {
		console.error("Failed to add site:", error);
	}
}

const removeSiteFromBuilding = async (siteId) => {
	try {
		apiLoading.value = true;

		const data = await removeBuildingSite(buildingId, siteId);

		snackbarText.value = "Site removed";
		snackbarIsError.value = false;
		snackbarShow.value = true;

		apiLoading.value = false;

		// reloads the site list for display and recent changes
		fetchBuildingSites();
		fetchBuildingRecentChanges();

	} catch (error) {
		console.error("Failed to add site:", error);
	}
}



onMounted(async () => {
	fetchBuildingData();
	fetchBuildingTenants();
	fetchBuildingSites();
	fetchBuildingRecentChanges();

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
