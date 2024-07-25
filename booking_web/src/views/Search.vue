<template>
	<v-layout style="background-color: #F3F4F5; padding-top: 64px;">

		<!-- navigation -->
		<CompNavigation></CompNavigation>

		<!-- search -->
		<v-row v-if="showSearchResults == false">
			<v-col style="padding-bottom: 20vh; padding-top: 15vh" class="">
				<div class="d-flex justify-center">
					<h1 class="font-heading" style="text-align: center; font-size: 2rem">Park Easy, Live
						Freely<br /><span style="color:#1570FC">FlexPark</span></h1>
				</div>
				<div class="d-flex justify-center mb-4 mt-2 mb-2">
					<p class="font-subheading" style="text-align: center; font-size: 1rem">Reserve Your Spot, Park with
						Ease.</p>
				</div>

				<!-- search component  -->
				<CompHeroSearch @search="handleSearch"></CompHeroSearch>

			</v-col>
		</v-row>

		<!-- results map -->
		<v-row v-if="showSearchResults == true && listViewToggleEnabled == false" no-gutters>
			<v-col>
				<GMapMap :zoom="15" map-type-id="roadmap" style="width: 100vw; height: calc(100vh - 64px);"
					:center="gmapCenter" :options="{
						zoomControl: true,
						mapTypeControl: false,
						scaleControl: true,
						streetViewControl: false,
						rotateControl: false,
						fullscreenControl: false,
					}">
					<GMapMarker :key="index" :position="site.position" v-for="(site, index) in availableSites" />
				</GMapMap>

				<!-- list or map views -->
				<div class="fixed-button">
					<v-btn-toggle v-model="listViewToggleEnabled" divided>
						<v-btn @click="listViewToggleEnabled = true">List View</v-btn>
						<v-btn @click="listViewToggleEnabled = false">Map View</v-btn>
					</v-btn-toggle>
				</div>
			</v-col>
		</v-row>

		<!-- results list -->
		<v-row v-if="showSearchResults == true && listViewToggleEnabled == true">
			<v-col class="ml-4 mr-4">
				<div class="mt-4 mb-2">
					<p class="font-field-label" style="font-size: 14px;">We found {{ availableSites.length }} results in this area</p>
				</div>

				<div>
					<SearchResult v-for="(site, index) in availableSites" class="mb-5" :key="index" :value="index" :site="site">
					</SearchResult>
				</div>

				<!-- list or map views -->
				<div class="fixed-button">
					<v-btn-toggle v-model="listViewToggleEnabled" divided>
						<v-btn @click="listViewToggleEnabled = true">List View</v-btn>
						<v-btn @click="listViewToggleEnabled = false">Map View</v-btn>
					</v-btn-toggle>
				</div>
			</v-col>
		</v-row>

	</v-layout>

	<!-- footer  -->
	<CompFooter v-if="showSearchResults == false"></CompFooter>

</template>

<script setup lang="js">
import { ref, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useSearchParkingStore } from '../stores/useSearchParkingStore';
import AuthService from '../services/AuthService';
import SearchParkingService from '../services/SearchParkingService';

// services
const searchParkingService = new SearchParkingService();
const authService = new AuthService();

// stores
const authStore = useAuthStore();
const searchParkingStore = useSearchParkingStore();


const availableSites = computed(() => searchParkingStore.availableSites);




// search UI states
let showSearchResults = ref(false);
let listViewToggleEnabled = ref(true);

let gmapCenter = ref(new Object({ lat: -33.86442906132449, lng: 151.2218284606934 }));

async function handleSearch(searchParams) {
	console.log('Search initiated with params:', searchParams);
	// Handle the search logic here

	try {
		// isFormLoading.value = true;
		const resp = await searchParkingService.fetchAvailableSites({
			"latitude": "-33.835400",
			"longitude": "151.213920",
			"radius": 0.4,
			"startDate": "2024-02-05T09:00:00.000Z",
			"endDate": "2024-02-06T18:00:00.000Z"
		})

		//console.log(resp);

		if (resp.status == 200) {
			// authStore.setUserAndToken(resp.user, resp.token);
			// router.push({ path: '/search' });
			console.log(resp);
			searchParkingStore.setAvailableSites(resp.sites);
			showSearchResults.value = true;

		} else if (resp.status == 404) {
			// awaitingActivation.value = true;
			// showFormError.value = false;

		} else {
			// formErrorMessage.value = resp.message || 'Login error occurred';
			// showFormError.value = true;

		}
	} catch (error) {
		//console.error('Signin failed:', error.message);
		// formErrorMessage.value = 'Network error';
		// showFormError.value = true;

	} finally {
		// isFormLoading.value = false;
		// if (!awaitingActivation.value) {
		//     awaitingActivation.value = false;
		// }
	}
}


</script>

<style scoped>
.searchfilter {
	/* background-color: grey; */

	border-top-color: grey-darken-1;
	border-top-width: 1px;

	border-bottom-color: grey-darken-1;
	border-bottom-width: 1px;
}

.searchbox {
	background-color: #dddddd;
	height: 10vh;
}

.ChooseParkingText {
	font-weight: 700;
	font-size: 25px;
}

.fixed-button {
	position: fixed;
	/* Use fixed positioning */
	left: 50%;
	/* Center horizontally */
	bottom: 20px;
	/* Distance from the bottom of the screen */
	transform: translateX(-50%);
	/* Adjust for exact centering */
	/* Add other styles as needed */
	z-index: 2;
	/* Ensure it's above other elements */
}
</style>