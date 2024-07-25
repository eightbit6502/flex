<template>
	<!-- Building Sites Card -->
	<v-row>
		<v-col>
			<v-card class="mx-auto shadow" elevation="0">

				<!-- title -->
				<v-card-item class="card-title">
					<v-card-title>
						<h5>Sites</h5>
					</v-card-title>
				</v-card-item>

				<!-- HR -->
				<div class="border-top"></div>
				<v-card-item>
					<div class="flex-container">

						<v-spacer></v-spacer>

						<!-- filter -->
						<v-text-field class="search-input" v-model="filterSiteSearch" label="Filter"
							prepend-inner-icon="mdi-magnify" variant="outlined" density="compact" hide-details
							single-line></v-text-field>

						<!-- add site dialog -->
						<v-dialog transition="scale-transition" max-width="500" v-model="dialogAddSite">
							<template v-slot:activator="{ props: alertAddSite }">
								<v-btn v-bind="alertAddSite" :disabled="buildingStore.building.status !== 'ACTIVE'"
									class="add-button text-none" prepend-icon="mdi-plus" color="primary" :ripple="false"
									text="Add Site"></v-btn>
							</template>

							<v-card>
								<v-icon class="dialog-close" @click="dialogAddSite = false">mdi-close</v-icon>
								<v-card-item class="modal-header">
									<p class="modal-heading-text">Add Site</p>
									<p class="modal-text">Search for a site by name.</p>
								</v-card-item>

								<v-autocomplete v-model="selectedSite" :loading="loading" :disabled="loading"
									:items="filteredOtherSiteNames" :search-input.sync="filterAutocompleteSites"
									item-text="name" item-value="id" cache-items="false"
									class="ml-6 mr-6 mx-4 pb-8 pt-4" variant="outlined" hide-details :clearable="true"
									label="Select a Site" solo-inverted></v-autocomplete>

								<!-- action buttons -->
								<v-card-actions style="padding-bottom: 30px">
									<v-spacer></v-spacer>
									<v-btn class="text-none rounded pl-5 pr-5" variant="outlined" :ripple="false"
										text="Add Site to Building" color="error" @click="addSite"
										:disabled="!selectedSite"></v-btn>
									<v-btn class="text-none rounded pl-5 pr-5" variant="flat" :ripple="false"
										text="Cancel" color="primary" width="100px"
										@click="dialogAddSite = false"></v-btn>
									<v-spacer></v-spacer>
								</v-card-actions>
							</v-card>
						</v-dialog>

					</div>
				</v-card-item>

				<!-- data table -->
				<div class="dt_align">
					<v-data-table class="dt_value" :items="buildingSitesStore.buildingSites" :search="filterSiteSearch"
						:headers="siteHeaders">

						<!-- link site name -->
						<template v-slot:item.name="{ item }">
							<router-link :to="'/site/' + item.id" class="dt_value_link">
								{{ item.name }}
							</router-link>
						</template>

						<!-- actions -->
						<template v-slot:item.actions="{ item }">

							<!-- edit icon -->
							<router-link :to="'/site/' + item.id" class="dt_value_link mr-3">
								<v-icon size="small">mdi-pencil</v-icon>
							</router-link>

							<!-- delete site icon dialog -->
							<router-link class="dt_value_link">
								<v-icon size="small" @click="openRemoveSiteDialog(item)">mdi-delete</v-icon>
							</router-link>

							<v-dialog transition="scale-transition" max-width="500" v-model="dialogRemoveSite">
								<v-card>
									<v-icon class="dialog-close" @click="dialogRemoveSite = false">mdi-close</v-icon>
									<v-card-item class="modal-header">
										<p class="modal-heading-text">Remove Site</p>
										<p class="modal-text">Do you want to remove <span style="font-weight: 700;">{{
											siteToRemove.name }}</span>?</p>
									</v-card-item>

									<!-- action buttons -->
									<v-card-actions style="padding-bottom: 30px">
										<v-spacer></v-spacer>
										<v-btn class="text-none rounded pl-5 pr-5" variant="outlined" :ripple="false"
											text="Remove Site from Building" color="error" @click="removeSite"
											:disabled="!siteToRemove"></v-btn>
										<v-btn class="text-none rounded pl-5 pr-5" variant="flat" :ripple="false"
											text="Cancel" color="primary" width="100px"
											@click="dialogRemoveSite = false"></v-btn>
										<v-spacer></v-spacer>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</template>
					</v-data-table>
				</div>
			</v-card>
		</v-col>
	</v-row>

</template>



<script setup lang="js">
// ----------- view/component core below
import { ref, watch, computed } from "vue";
import { useBuildingStore } from "@/stores/buildingStore";
import { useBuildingSitesStore } from "@/stores/buildingSitesStore";


// store
const buildingSitesStore = useBuildingSitesStore();
const buildingStore = useBuildingStore();

// props
const props = defineProps({

	// used to show api call in progress
	loading: {
		type: Boolean,
		default: false
	}
});


// emits
const emit = defineEmits(['get-other-sites', 'add-site', 'remove-site']);



// ----------- view/component related below

// used in autocompletes
const selectedSite = ref(null);
const filterAutocompleteSites = ref("");

// filter the site list view
const filterSiteSearch = ref("");

// dialog's
const dialogAddSite = ref(false);
const dialogRemoveSite = ref(false);

// site to be removed
const siteToRemove = ref(null);

// datatable
const siteHeaders = ref([
	{ title: "ID", value: "id" },
	{ title: "Name", value: "name" },
	{ title: "Description", value: "description" },
	{ title: "Open", value: "dailyOpen" },
	{ title: "Close", value: "dailyClose" },
	{ title: "Bays", value: "totalBays" },
	{ title: "Status", value: "status" },
	{ title: "Actions", value: "actions" },
]);

// watch to see when dialog to add site is opened
watch(
	() => dialogAddSite.value,
	(isOpen) => {
		if (isOpen == true) {
			emit('get-other-sites');
		}
		// console.log(building);
	},
	{ immediate: true }
);

// computed property to filter sites to be added to building
const filteredOtherSites = computed(() => {
	const existingSiteIds = new Set(buildingSitesStore.buildingSites.map(site => site.id));
	return buildingSitesStore.otherSites.filter(site => !existingSiteIds.has(site.id));
});
// computed property to get site names/id for the autocomplete, piggy-backs on the above
const filteredOtherSiteNames = computed(() => {
	return filteredOtherSites.value.map((site) => ({
		title: site.name,
		id: site.id,
	}));;
});


// handler to open remove site dialog and store ref to desired site to be removed
const openRemoveSiteDialog = (site) => {
	siteToRemove.value = site;
	dialogRemoveSite.value = true;
};



// ----------- emits

// emitted when the site is added
const addSite = () => {
	dialogAddSite.value = false;

	emit('add-site', selectedSite.value);
	selectedSite.value = null;
}

// emitted when a site is removed
const removeSite = () => {
	dialogRemoveSite.value = false;

	emit('remove-site', siteToRemove.value.id);
	dialogRemoveSite.value = false;
}
</script>



<style scoped lang="scss">
// reusable window title
.card-title {
	padding-top: 20px;
	padding-left: 24px;
	padding-bottom: 0px;
}

.border-top {
	margin-top: 10px;
	border-top: 1px solid rgba(var(--v-font-color-heading-menu), 0.5);
	padding-bottom: 10px;
	opacity: 0.5;
}


// .card-content {
//     color: rgb(var(--v-theme-primary)) !important;
//     display: block;
// }


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

// .warning-text {
//     font-size: 18px;
//     font-weight: 500;
//     padding-top: 30px;
//     padding-bottom: 0px;
// }

// .building-details-buttons {
//     margin-bottom: 20px;
// }

// .card-content-link {
//     color: rgb(var(--v-theme-primary)) !important;
//     display: block;
//     text-decoration: none;
// }

.flex-container {
	padding-top: 5px;

	display: flex;
	gap: 16px;
	width: 100%;
}


.search-input {
	max-width: 250px;
	height: 40px;
}


.dt_align {
	padding-left: 16px;
	padding-right: 16px;
}

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

.dt_value_link :hover {
	text-decoration: none;
	color: rgb(var(--v-theme-primary));
}
</style>
