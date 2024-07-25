<template>
	<v-card class="mx-auto shadow" elevation="0">

		<!-- title -->
		<v-card-item class="card-title">
			<v-card-title>
				<h5>Filters</h5>
			</v-card-title>
		</v-card-item>

		<!-- filters -->
		<v-card-item>
			<div class="flex-container pad-card">
				<v-row>
					<v-col cols="12" md="4" style="padding-bottom: 0;">
						<v-select label="Select Country" :items="countryItems" v-model="filterCountry"
							:disabled="!!filterState" variant="outlined" density="compact" clearable></v-select>
					</v-col>

					<v-col cols="12" md="4" style="padding-bottom: 0;">
						<v-select label="Select State" :items="stateItems" v-model="filterState"
							:disabled="!!filterCountry" variant="outlined" density="compact" clearable></v-select>
					</v-col>

					<v-col cols="12" md="4">
						<v-select label="Select Status" :items="['ACTIVE', 'DISABLED']" v-model="filterStatus"
							variant="outlined" density="compact" clearable></v-select>
					</v-col>
				</v-row>



			</div>
		</v-card-item>

		<!-- HR -->
		<div class="border-top"></div>

		<v-card-item>
			<div class="flex-container pad-card">

				<v-spacer></v-spacer>

				<!-- search -->
				<v-text-field class="search-input" v-model="filterSearch" label="Enter text to filter by"
					prepend-inner-icon="mdi-magnify" variant="outlined" density="compact" hide-details
					single-line></v-text-field>

				<v-btn class="add-button text-none" prepend-icon="mdi-plus" color="primary" :ripple="false"
					text="Add Building" to="/building/create"></v-btn>
			</div>
		</v-card-item>

		<!-- data table -->
		<v-data-table class="dt_value pad-card" :disable-sort="false" :items="filteredBuildingData"
			:search="filterSearch" :headers="headers" show-select>

			<!-- link building name -->
			<template v-slot:item.name="{ item }">
				<router-link :to="'/building/' + item.id" class="dt_value_link">
					{{ item.name }}
				</router-link>
			</template>

			<!-- building address -->
			<template v-slot:item.address="{ item }">
				<p>{{ item.addressLine1 }}, {{ item.addressLine2 }}</p>
				<p>{{ item.state }}, {{ item.country }}, {{ item.postcode }}</p>
			</template>

			<!-- building tenants -->
			<template v-slot:item.tenants="{ item }">
				<p>{{ item.tenantCount }}</p>
			</template>

			<!-- building status -->
			<template v-slot:item.status="{ item }">
				<p>{{ item.status.toLowerCase() }}</p>
			</template>

			<!-- actions -->
			<template v-slot:item.actions="{ item }">
				<v-icon class="me-2" size="small" @click="editItem(item)">
					mdi-pencil
				</v-icon>
				<v-icon size="small" @click="deleteItem(item)">
					mdi-delete
				</v-icon>
			</template>
		</v-data-table>
	</v-card>
</template>


<script setup lang="js">
import { ref, watch, computed } from "vue";

// store

// props
const props = defineProps(['buildingData'])

// refs


const headers = ref([
	{ title: 'Id', key: 'id' },
	{ title: 'Name', key: 'name' },
	{ title: 'Address', value: 'address' },
	{ title: 'Status', key: 'status' },
	{ title: 'Sites', key: 'totalSites' },
	{ title: 'Tenants', key: 'totalTenants' },
	{ title: 'Actions', key: 'actions' }
]);

let filterSearch = ref('');
let filterStatus = ref(null);
let filterState = ref(null);
let filterCountry = ref(null);



// dialog's
const dialogEditLocation = ref(false);

// emits
// const emit = defineEmits(['update-building', 'enable-building', 'archive-building']);


const filteredBuildingData = computed(() => {
	return props.buildingData && Array.isArray(props.buildingData) ? props.buildingData.filter(item => {
		// Check search filter
		const searchMatch = filterSearch.value ? item.name.toLowerCase().includes(filterSearch.value.toLowerCase()) : true;

		// Check status filter
		const statusMatch = filterStatus.value ? item.status === filterStatus.value : true;

		// Check state filter
		const stateMatch = filterState.value ? item.state === filterState.value : true;

		// Check country filter
		const countryMatch = filterCountry.value ? item.country === filterCountry.value : true;

		return searchMatch && statusMatch && stateMatch && countryMatch; // Match all filters
	}) : [];
});

const stateItems = computed(() => {
	const states = props.buildingData ? [...new Set(props.buildingData.map(item => item.state))].sort() : [];
	return states;
});

const countryItems = computed(() => {
	const countries = props.buildingData ? [...new Set(props.buildingData.map(item => item.country))].sort() : [];
	return countries;
});


// emits --------------------


</script>


<style scoped lang="scss">
.card-title {
	padding-top: 20px;
	padding-left: 24px;
	padding-bottom: 0px;
}

.pad-card {
	padding-left: 6px;
	padding-right: 6px;
}

.flex-container {
	padding-top: 5px;

	display: flex;
	gap: 16px;
	width: 100%;
}

.flex-container .v-select {
	flex: 1;
	min-width: 200;
}

.border-top {
	border-top: 1px solid rgb(var(--v-font-color-heading-menu));
	padding-bottom: 10px;
	opacity: 0.5;
}

.search-input {
	max-width: 250px;
	height: 40px;
}


.add-button {
	padding-left: 20px;
	padding-right: 20px;
	width: 175px;
	height: 40px;
}



.export-nav-item {
	font-size: var(--v-font-size-menu);
	color: rgb(var(--v-font-color-body));
}

.list-item :deep(.v-list-item__spacer) {
	width: 8px;
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

.mdi-arrow-down::before {
	top: 2px;
	font-size: 15px;
	margin-left: 4px;
	color: #ff0000 !important
}
</style>
