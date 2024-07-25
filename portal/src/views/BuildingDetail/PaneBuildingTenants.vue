<template>
	<!-- Building Tenants Card -->
	<v-row>
		<v-col>
			<v-card class="mx-auto shadow" elevation="0">

				<!-- title -->
				<v-card-item class="card-title">
					<v-card-title>
						<h5>Tenants</h5>
					</v-card-title>
				</v-card-item>

				<!-- HR -->
				<div class="border-top"></div>
				<v-card-item>
					<div class="flex-container">

						<v-spacer></v-spacer>

						<!-- filter -->
						<v-text-field class="search-input" v-model="filterTenantSearch" label="Filter"
							prepend-inner-icon="mdi-magnify" variant="outlined" density="compact" hide-details
							single-line></v-text-field>

						<!-- add tenant dialog -->
						<v-dialog transition="scale-transition" max-width="500" v-model="dialogAddTenant">
							<template v-slot:activator="{ props: alertAddTenant }">
								<v-btn v-bind="alertAddTenant" :disabled="buildingStore.building.status !== 'ACTIVE'"
									class="add-button text-none" prepend-icon="mdi-plus" color="primary" :ripple="false"
									text="Add Tenant"></v-btn>
							</template>

							<v-card>
								<v-icon class="dialog-close" @click="dialogAddTenant = false">mdi-close</v-icon>
								<v-card-item class="modal-header">
									<p class="modal-heading-text">Add Tenant</p>
									<p class="modal-text">Search for a tenant by name.</p>
								</v-card-item>

								<v-autocomplete v-model="selectedTenant" :loading="loading" :disabled="loading"
									:items="filteredOtherTenantNames" :search-input.sync="filterAutocompleteTenants"
									item-text="name" item-value="id" cache-items="false"
									class="ml-6 mr-6 mx-4 pb-8 pt-4" variant="outlined" hide-details :clearable="true"
									label="Select a Tenant" solo-inverted></v-autocomplete>

								<!-- action buttons -->
								<v-card-actions style="padding-bottom: 30px">
									<v-spacer></v-spacer>
									<v-btn class="text-none rounded pl-5 pr-5" variant="outlined" :ripple="false"
										text="Add Tenant to Building" color="error" @click="addTenant"
										:disabled="!selectedTenant"></v-btn>
									<v-btn class="text-none rounded pl-5 pr-5" variant="flat" :ripple="false"
										text="Cancel" color="primary" width="100px"
										@click="dialogAddTenant = false"></v-btn>
									<v-spacer></v-spacer>
								</v-card-actions>
							</v-card>
						</v-dialog>

					</div>
				</v-card-item>

				<!-- data table -->
				<div class="dt_align">
					<v-data-table class="dt_value" :items="buildingTenantsStore.buildingTenants"
						:search="filterTenantSearch" :headers="tenantHeaders">

						<!-- link tenant name -->
						<template v-slot:item.name="{ item }">
							<router-link :to="'/tenant/' + item.id" class="dt_value_link">
								{{ item.name }}
							</router-link>
						</template>

						<!-- actions -->
						<template v-slot:item.actions="{ item }">

							<!-- edit icon -->
							<router-link :to="'/tenant/' + item.id" class="dt_value_link mr-3">
								<v-icon size="small">mdi-pencil</v-icon>
							</router-link>

							<!-- delete tenant dialog -->
							<router-link class="dt_value_link">
								<v-icon size="small" @click="openRemoveTenantDialog(item)">mdi-delete</v-icon>
							</router-link>

							<v-dialog transition="scale-transition" max-width="500" v-model="dialogRemoveTenant">
								<v-card>
									<v-icon class="dialog-close" @click="dialogRemoveTenant = false">mdi-close</v-icon>
									<v-card-item class="modal-header">
										<p class="modal-heading-text">Remove Tenant</p>
										<p class="modal-text">Do you want to remove <span style="font-weight: 700;">{{
											tenantToRemove.name }}</span>?</p>
									</v-card-item>

									<!-- action buttons -->
									<v-card-actions style="padding-bottom: 30px">
										<v-spacer></v-spacer>
										<v-btn class="text-none rounded pl-5 pr-5" variant="outlined" :ripple="false"
											text="Remove Tenant from Building" color="error" @click="removeTenant"
											:disabled="!tenantToRemove"></v-btn>
										<v-btn class="text-none rounded pl-5 pr-5" variant="flat" :ripple="false"
											text="Cancel" color="primary" width="100px"
											@click="dialogRemoveTenant = false"></v-btn>
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
import { useBuildingTenantsStore } from "@/stores/buildingTenantsStore";


// store
const buildingTenantsStore = useBuildingTenantsStore();
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
const emit = defineEmits(['get-other-tenants', 'add-tenant', 'remove-tenant']);



// ----------- view/component related below

// used in autocompletes
const selectedTenant = ref(null);
const filterAutocompleteTenants = ref("");

// filter the tenant list view
const filterTenantSearch = ref("");

// dialog's
const dialogAddTenant = ref(false);
const dialogRemoveTenant = ref(false);

// tenant to be removed
const tenantToRemove = ref(null);

// datatable
const tenantHeaders = ref([
	{ title: "ID", value: "id" },
	{ title: "Name", value: "name" },
	{ title: "Users", value: "totalUsers" },
	{ title: "Status", value: "status" },
	{ title: "Actions", value: "actions" },
]);

// watch to see when dialog to add tenant is opened
watch(
	() => dialogAddTenant.value,
	(isOpen) => {
		if (isOpen == true) {
			emit('get-other-tenants');
		}
		// console.log(building);
	},
	{ immediate: true }
);

// computed property to filter tenants to be added to building
const filteredOtherTenants = computed(() => {
	const existingTenantIds = new Set(buildingTenantsStore.buildingTenants.map(tenant => tenant.id));
	return buildingTenantsStore.otherTenants.filter(tenant => !existingTenantIds.has(tenant.id));
});
// computed property to get tenant names/id for the autocomplete, piggy-backs on the above
const filteredOtherTenantNames = computed(() => {
	return filteredOtherTenants.value.map((tenant) => ({
		title: tenant.name,
		id: tenant.id,
	}));;
});


// handler to open remove tenant dialog and store ref to desired tenant to be removed
const openRemoveTenantDialog = (tenant) => {
	tenantToRemove.value = tenant;
	dialogRemoveTenant.value = true;
};



// ----------- emits

// emitted when the tenant is added
const addTenant = () => {
	dialogAddTenant.value = false;

	emit('add-tenant', selectedTenant.value);
	selectedTenant.value = null;
}

// emitted when a tenant is removed
const removeTenant = () => {
	dialogRemoveTenant.value = false;

	emit('remove-tenant', tenantToRemove.value.id);
	dialogRemoveTenant.value = false;
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
