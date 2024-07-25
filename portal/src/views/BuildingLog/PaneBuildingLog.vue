<template>
	<!-- Building Sites Card -->
	<v-row>
		<v-col>
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
						<v-date-input prepend-icon="" prepend-inner-icon="$calendar" v-model="dateRange"
							label="Select date range" multiple="range" :show-adjacent-months="true" variant="outlined"
							density="compact" clearable></v-date-input>
						<v-select label="Action" :items="actionItems" v-model="filterAction" variant="outlined"
							density="compact" clearable></v-select>
						<v-select label="User" :items="userItems" v-model="filterUser" variant="outlined"
							density="compact" clearable></v-select>
						<!-- <v-spacer></v-spacer> -->
						<v-btn class="text-none rounded" variant="flat" @click="updateLogParams" :ripple="false"
							text="Update Logs" color="primary"></v-btn>
					</div>
				</v-card-item>

				<!-- HR -->
				<div class="border-top"></div>

				<v-card-item>
					<div class="flex-container pad-card">
						<!-- export menu -->
						<v-menu>
							<template v-slot:activator="{ props }">
								<v-btn text="Export" class="text-none" variant="outlined" v-bind="props"></v-btn>
							</template>
							<v-list>
								<!-- Actions -->
								<v-list-item v-for="(item, index) in exportTypes" :key="index" :value="index"
									:prepend-icon="item.icon" class="list-item">
									<v-list-item-title class="export-nav-item">{{ item.title }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>

						<v-spacer></v-spacer>

						<!-- search -->
						<v-text-field class="search-input" v-model="filterSearch" label="Enter text to filter by"
							prepend-inner-icon="mdi-magnify" variant="outlined" density="compact" hide-details
							single-line></v-text-field>
					</div>
				</v-card-item>

				<!-- data table -->
				<v-data-table class="dt_value pad-card" :disable-sort="false" :items="filteredBuildingLogs"
					:headers="headers" show-select>
					<template v-slot:item.rawLog="{ item }">
						<!-- view full log dialog -->
						<v-btn v-if="item.newValue !== null" variant="outlined" :ripple="false" size="small"
							@click="openLogDialog(item)">View</v-btn>
					</template>
				</v-data-table>
			</v-card>
		</v-col>
	</v-row>

	<v-dialog transition="scale-transition" max-width="500" v-model="dialogLog">
		<v-card>
			<v-icon class="dialog-close" @click="dialogLog = false">mdi-close</v-icon>
			<v-card-item class="modal-header">
				<p class="modal-heading-text">Log Data</p>
				<p class="modal-text">This was the updated data in this event</p>
			</v-card-item>

			<v-card-item class="mb-2 ml-5">
				<!-- <p>{{ selectedLog.newValue }}</p> -->
				<p v-for="(value, key) in selectedLog.newValue" :key="key">
					<span style="font-weight: 600;">{{ key }}</span> {{ value }}
				</p>
			</v-card-item>
			<!-- <p>{{ selectedLog.newValue }}</p> -->

			<!-- action buttons -->
			<v-card-actions style="padding-bottom: 30px">
				<v-spacer></v-spacer>
				<v-btn class="text-none rounded pl-5 pr-5" variant="flat" :ripple="false" text="Close" color="primary"
					width="100px" @click="dialogLog = false"></v-btn>
				<v-spacer></v-spacer>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>



<script setup lang="js">
import { ref, computed } from "vue";
import { VDateInput } from 'vuetify/labs/VDateInput'
import { convertToUserLocalTime } from '@/utils/datetime';

// props
const props = defineProps(['loading', 'logs']);

// dialog's
const dialogLog = ref(null);

// refs
const selectedLog = ref(null);

const dateRange = ref(null);

// emits
const emit = defineEmits(['update-logs']);


// headers
const headers = ref([
	{ title: 'Date', key: 'createdAt', value: item => `${convertToUserLocalTime(item.createdAt)}` },
	{ title: 'Action', key: 'action' },
	{ title: 'Description', key: 'description' },
	{ title: 'Username', key: 'userName' },
	{ title: 'User Id', key: 'userId' },
	{ title: 'More Info', value: 'rawLog' }
]);

// export types
const exportTypes = ref([
	{ icon: 'mdi-printer-outline', title: 'Print' },
	{ icon: 'mdi-file-delimited-outline', title: 'CSV' },
	{ icon: 'mdi-file-excel-outline', title: 'Excel' },
	{ icon: 'mdi-file-document-outline', title: 'PDF' },
	{ icon: 'mdi-image-outline', title: 'JPG' },
	{ icon: 'mdi-clipboard-file-outline', title: 'Copy' }
]);

// filters
let filterSearch = ref('');
let filterAction = ref(null);
let filterUser = ref(null);

// computed properties for filtering
const filteredBuildingLogs = computed(() => {
	return props.logs && Array.isArray(props.logs) ? props.logs.filter(item => {
		const actionMatch = filterAction.value ? item.action === filterAction.value : true;
		const userMatch = filterUser.value ? item.userName === filterUser.value : true;
		return actionMatch && userMatch;
	}) : [];
});

// state and country items for select inputs
const actionItems = computed(() => {
	const actions = props.logs ? [...new Set(props.logs.map(item => item.action))] : [];
	return actions.sort();
});

const userItems = computed(() => {
	const users = props.logs ? [...new Set(props.logs.map(item => item.userName))] : [];
	return users.sort();
});

// handler to open log dialog
const openLogDialog = (log) => {
	selectedLog.value = log;
	dialogLog.value = true;
};



// ----------- emits

// emitted when the site is added
const updateLogParams = () => {
	let startDate = dateRange.value[0];
	let endDate = dateRange.value[dateRange.value.length - 1];

	emit('update-logs', { startDate, endDate });
}

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
