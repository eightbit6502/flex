<template>
	<v-layout style="">

		<!-- navigation -->
		<!-- <CompNavigation></CompNavigation> -->

		<!-- search -->
		<v-row v-if="showSearchResults == false">
			<v-col style="background-color: #F1EFEF">
				<div class="d-flex justify-center">
					<h1 style="text-align: center;">Park Easy, Live Freely<br /><span style="color:blue">FlexPark</span></h1>
				</div>
				<div class="d-flex justify-center mb-3">
					<p style="text-align: center;">Reserve Your Spot, Park with Ease.</p>
				</div>
				
				<v-card class="mx-auto pa-4" elevation="0" max-width="90vw" rounded="lg">
					<v-card-text>
						<!-- form -->
						<v-form v-model="isFormValid" lazy-validation>
							<div class="text-subtitle-1 text-medium-emphasis">Email</div>

							<!-- <v-text-field autofocus v-model="signinEmail" :rules="signinEmailRules" required
							density="compact" placeholder="bruce@batcave.com" prepend-inner-icon="mdi-email-outline"
							variant="outlined">
						</v-text-field> -->

							<div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
								Password
							</div>

							<!-- <v-text-field v-model="signinPassword" :rules="[rules.required, rules.min]" required
							:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
							:type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
							prepend-inner-icon="mdi-lock-outline" variant="outlined"
							@click:append-inner="visible = !visible"></v-text-field> -->

							<v-card-text class="text-end mt-n7 mb-3">
								<RouterLink to="/forgot" class="text-blue text-decoration-none">Forgot Password?
								</RouterLink>
							</v-card-text>

							<!-- <v-btn block :disabled="!isFormValid" :loading="isFormLoading" class="mb-8" color="blue"
							size="large" variant="tonal" @click="submit">
							Sign In
						</v-btn> -->
						</v-form>

						<v-card-text class="text-center">
							<p>Don't have an account?</p>
							<RouterLink to="/signup" class="text-blue text-decoration-none">Sign up now <v-icon
									icon="mdi-chevron-right"></v-icon></RouterLink>
						</v-card-text>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- search results -->
		<v-row v-if="showSearchResults">
			<v-col v-if="listViewToggleEnabled == true" class="order-last order-md-first">

				<!-- search -->
				<v-row class="searchbox mb-2">
					<p class="ChooseParkingText">Where would you like to park?</p>
				</v-row>

				<!-- tiles -->
				<v-row>
					<v-item-group mandatory>
						<v-container>
							<v-row>
								<SearchResult v-for="(site, index) in availableSites" :key="index" :value="index"
									:siteName="site.siteName" :address="site.siteAddress" :dist="site.siteDist"
									:rate="site.rate">
								</SearchResult>
							</v-row>
						</v-container>
					</v-item-group>
				</v-row>

			</v-col>

			<!-- gmap -->
			<v-col v-if="listViewToggleEnabled == false" cols="12" md="7">
				<v-row class="d-flex align-center flex-column" style="">
					<GMapMap :zoom="15" map-type-id="roadmap" style="width: 100vw; height: 90vh" :center="gmapCenter"
						:options="{
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
					<div class="" style="float: left; margin-top: -8vh;">
						<v-btn-toggle v-model="listViewToggleEnabled" divided>
							<v-btn @click="listViewToggleEnabled = true">List View</v-btn>
							<v-btn @click="listViewToggleEnabled = false">Map View</v-btn>
						</v-btn-toggle>
					</div>
				</v-row>
			</v-col>
		</v-row>

	</v-layout>

</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import SearchResult from '../components/SearchResult.vue';
import { searchParkingStore } from '../stores/searchParkingStore';

const carparkResults = searchParkingStore();
const availableSites = computed(() => carparkResults.availableSites);

let showSearchResults = ref(false);
let listViewToggleEnabled = ref(false);
let isFormValid = ref(false);



let gmapCenter = ref(new Object({ lat: -33.86442906132449, lng: 151.2218284606934 }));

let geocodedAddresses = ref<Object[]>(new Array(new Object(
	{
		"id": 0,
		"name": "No Address Found",
		"lat": "",
		"lng": ""
	}
)));
const searchedAddress = ref(null)
const selectedId = computed(() => { return searchedAddress.value?.id })
const selectedName = computed(() => { return searchedAddress.value?.name })


// used to update the maps center position
watch(searchedAddress, async (newAddress, oldAddress) => {
	if (selectedId.value >= 0) {
		gmapCenter.value = new Object({
			lat: geocodedAddresses.value[selectedId.value].lat,
			lng: geocodedAddresses.value[selectedId.value].lng
		});

		carparkResults.fetchAvailableSites({
			"latitude": geocodedAddresses.value[selectedId.value].lat,
			"longitude": geocodedAddresses.value[selectedId.value].lng,
			"radius": 0.4,
			"startDate": "2024-02-05T09:00:00.000Z",
			"endDate": "2024-02-06T18:00:00.000Z"
		});
	}
})


// invoked when the search field is changed, here we get the geocoded addresses from google API
function checkGeocodes() {
	if (searchedAddress.value) {
		if (searchedAddress.value.length > 5) {
			let str = encodeURIComponent(searchedAddress.value);
			let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + str + '&key=AIzaSyAoHmQZTE554p1lMwpZ4jQ6YZSct6lFY8Q&region=AU';
			fetch(url)
				.then(response => response.json())
				.then((response) => {
					//console.log(response.results)
					geocodedAddresses.value.splice(0);

					console.log(response)

					for (let index = 0; index < response.results.length; index++) {
						const result = response.results[index];
						geocodedAddresses.value.push(
							{
								"id": index,
								"name": result.formatted_address,
								"lat": result.geometry.location.lat,
								"lng": result.geometry.location.lng,
							})
					}

					if (geocodedAddresses.value.length == 0) {
						geocodedAddresses.value.push(
							{
								"id": 999,
								"name": "No Address Found",
								"lat": "",
								"lng": "",
							}
						)
					}
				})
		}
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
</style>