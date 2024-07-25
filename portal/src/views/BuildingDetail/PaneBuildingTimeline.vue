<template>
	<!-- Building Timeline Card -->
	<v-row>
		<v-col>
			<v-card class="mx-auto shadow last-card-spacer" elevation="0">

				<!-- title -->
				<v-card-item class="card-title">
					<v-card-title>
						<h5>Recent Events</h5>
					</v-card-title>
				</v-card-item>

				<!-- HR -->
				<div class="border-top"></div>
				<v-card-item>
					<div class="" style="margin: 10px 10px 20px 10px">
						<v-timeline class="" density="compact" dot-color="rgb(var(--v-theme-primary))" size="12"
							line-color="rgb(var(--v-theme-primary))" line-inset="7px" line-thickness="1px">

							<!-- iterate over results -->
							<v-timeline-item v-for="changeLog in buildingStore.recentChanges" class="mb-4">
								<v-row>
									<!-- <v-col cols="8" class="log-title">{{ getActionText(changeLog) }}</v-col> -->
									<v-col cols="8" class="log-title">{{ changeLog.userName }} {{ changeLog.description
										}}</v-col>
									<!-- <v-spacer></v-spacer> -->
									<v-col cols="4" class="log-datetime">{{
										convertToUserLocalTime(changeLog.createdAt)
									}}</v-col>
								</v-row>
								<v-row>
									<v-col class="mt-n5 log-body">
										<p v-if="changeLog.action === 'update'">
											{{ formatChangeLogValues(changeLog.newValue) }}
										</p>
									</v-col>
								</v-row>
							</v-timeline-item>

						</v-timeline>
					</div>
				</v-card-item>
			</v-card>
		</v-col>
	</v-row>

</template>



<script setup lang="js">
// ----------- view/component core below
import { ref, watch, computed } from "vue";
import { convertToUserLocalTime } from '@/utils/datetime';

import { useBuildingStore } from "@/stores/buildingStore";


// store

const buildingStore = useBuildingStore();

// props



// emits




// ----------- view/component related below
const getActionText = (changeLog) => {
	switch (changeLog.action) {
		case 'create':
			return `${changeLog.userName} created ${changeLog.entityType}`;
		case 'update':
			return `${changeLog.userName} updated ${changeLog.entityType}`;
		case 'delete':
			return `${changeLog.userName} deleted ${changeLog.entityType}`;
		default:
			return `${changeLog.userName} performed an action on ${changeLog.entityType}`;
	}
};

// Method to format change log values
const formatChangeLogValues = (newValue) => {
	return Object.entries(newValue)
		//.map(([key, value]) => `${key}: ${value}`)
		.map(([key, value]) => `${key}`)
		.join(', ');
};



// ----------- emits



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

// fix timeline alignment of date/time to outer right
.v-timeline-item :deep(.v-timeline-item__body) {
	justify-self: unset !important;
}

.log-title {
	font-weight: 500;
	color: rgb(var(--v-font-color-body));
}

.log-datetime {
	color: rgb(var(--v-font-color-heading-menu));
	text-align: right;
}

.log-body {
	color: rgb(var(--v-font-color-heading-menu));
}


.last-card-spacer {

	margin-bottom: 70px
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
</style>
