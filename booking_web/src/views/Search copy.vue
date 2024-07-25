<template>
	<!-- <v-app-bar :elevation="0">
			<v-app-bar-title>Application Bar</v-app-bar-title>
		</v-app-bar>
	<v-container fluid> -->
		

		<!-- search fields -->
		<v-row>
			<!-- search address -->
			<v-col>
				<v-combobox v-model="searchedAddress" :items="geocodedAddresses" item-title="name" item-value="id"
					density="compact" variant="solo" :hide-no-data="true" placeholder="Search location"
					prepend-inner-icon="mdi-magnify" @input="checkGeocodes"></v-combobox>


			</v-col>

			<!-- parking type, dates and times -->
			<v-col :cols="12" md="7">

				<!-- type -->
				<!-- todo: hacky -margin for position -->
				<v-menu>
					<template v-slot:activator="{ props }">
						<v-btn append-icon="mdi-boom-gate" v-bind="props" style="margin-top: -82px;" class="mr-2"
							:text="parkingTypes[selectedParkingType].title.toString()">
							<!-- Daily Parking -->
							<template v-slot:append>
								<v-icon></v-icon>
							</template>
						</v-btn>
					</template>
					<v-list>
						<v-list-item v-for="(parkingType, index) in parkingTypes" :key="index" :value="index"
							@click="selectedParkingType = index">
							<v-list-item-title>{{ parkingType.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>

				<!-- date -->
				<v-text-field label="Arrival Date" model-value="04/11/2024" type="date" density="compact"
					style="display: inline-block;" class="mr-2"></v-text-field>

				<v-text-field v-if="selectedParkingType !== 2 && selectedParkingType !== 1" label="Arrival Time"
					model-value="12:30:00" type="time" density="compact" style="display: inline-block;"
					class="mr-2"></v-text-field>

				<v-text-field v-if="selectedParkingType !== 2" label="Exit Date" model-value="04/11/2024" type="date"
					density="compact" style="display: inline-block;" class="mr-2"></v-text-field>

				<v-text-field v-if="selectedParkingType !== 2 && selectedParkingType !== 1" label="Exit Time"
					model-value="16:30:00" type="time" density="compact" style="display: inline-block;"
					class="mr-2"></v-text-field>

			</v-col>

			<!-- list or map views -->
			<v-col>
				<div class="d-flex align-center flex-column pa-6">
					<v-btn-toggle v-model="listViewToggleEnabled" variant="outlined" divided>
						<v-btn @click="listViewToggleEnabled = true">List View</v-btn>
						<v-btn @click="listViewToggleEnabled = false">Map View</v-btn>
					</v-btn-toggle>
				</div>
			</v-col>
		</v-row>

		<v-row>

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
				<v-row>
					<GMapMap :zoom="15" map-type-id="roadmap" style="width: 100vw; height: 80vh" :center="gmapCenter"
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
				</v-row>
			</v-col>
		</v-row>

		<v-row>
			<CompNavigation></CompNavigation>
		</v-row>
		<CompNavigation></CompNavigation>
	</v-container>

</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import SearchResult from '../components/SearchResult.vue';
import { searchParkingStore } from '../stores/searchParkingStore';

const carparkResults = searchParkingStore();
const availableSites = computed(() => carparkResults.availableSites);

let listViewToggleEnabled = ref(false);
let selectedParkingType = ref(1);
const parkingTypes = [
	{ id: 0, title: 'Hourly Parking' },
	{ id: 1, title: 'Daily Parking' },
	{ id: 2, title: 'Monthly Parking' }
]



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