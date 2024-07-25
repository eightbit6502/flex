<template>
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
					<v-row>
						<v-col>
							<h4 class="mt-2">Building List</h4>
							<p class="mb-8">These are the buildings you can manage</p>
						</v-col>
					</v-row>


					<PaneBuildingList :buildingData="buildingData"></PaneBuildingList>

					<!-- footer -->
					<CompFooter></CompFooter>
				</div>
			</div>
		</v-main>
	</v-layout>
</template>







<!-- script -->
<script setup lang="js">
import { ref, onMounted, computed } from 'vue';
import { getAllBuildingData } from '@/services/buildingService';
// import { useAuthStore } from '../stores/authStore';
import PaneBuildingList from './PaneBuildingList.vue';

const buildingData = ref([]);


onMounted(async () => {
	try {
		fetchBuildingData();
	} catch (error) {
		console.error('Failed to fetch building data:', error);
	}
});






// get data
const fetchBuildingData = async () => {
	try {
		// apiLoading.value = true;
		const response = await getAllBuildingData();

		// store building data locally as it's used in only a single component
		buildingData.value = response.buildings || [];

		// apiLoading.value = false;

	} catch (error) {
		console.error("Failed to fetch building data:", error);
	}
}


</script>






<style scoped lang="scss">
.body-position-fix {
	display: flex;
	justify-content: center;
}

.content-wrapper {
	width: 96%;
	max-width: var(--v-max-body-width);
}

.app-bar-position {
	// margin-bottom:20px;
	margin-bottom: var(--v-spacing-appbar-offset);
}

.flex-container {
	padding-top: 5px;

	display: flex;
	gap: 16px;
	width: 100%;
}




// view css





// bans / not used
.padding-card {
	padding-left: 20px;
	padding-right: 20px;
}

.bans {
	margin-bottom: 10px;
}

.card-padding {
	padding: 20px 20px 0px 20px;
}
</style>
