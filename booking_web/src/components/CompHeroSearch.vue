<template>
  <v-card class="mx-auto pa-1" elevation="0" max-width="90vw" rounded="lg">
    <v-card-text>
      <!-- form -->
      <v-form>
        <div class="font-field-label mb-1">Location</div>

        <!-- search address -->
        <v-text-field id="menu-activator" placeholder="Enter Address" variant="outlined" density="compact"
          v-model="addresstoBeGeocoded" @input="geocodeAddress"  @click:clear="onAddressClear" clearable>
        </v-text-field>

        <v-menu activator="#menu-activator">
          <v-list v-if="suggestions.length > 0">
            <v-list-item v-for="suggestion in suggestions" :key="suggestion.label" :title="suggestion.label"
              @click="selectGeocodedAddress(suggestion)"></v-list-item>
          </v-list>
        </v-menu>


        <!-- date & time pickers -->
        <v-row no-gutters>
          <!-- arrival date -->
          <v-col cols="6" class="font-field-label">
            <p class="mb-1">Arrival Date</p>
            <v-text-field v-model="searchArrivalDate" type="date" density="compact" variant="outlined"></v-text-field>
          </v-col>

          <!-- exit date -->
          <v-col cols="6" class="font-field-label">
            <p class="mb-1">Exit Date</p>
            <v-text-field v-model="searchExitDate" type="date" density="compact" variant="outlined"></v-text-field>
          </v-col>

          <!-- arrival time -->
          <v-col cols="6" sm="6" md="3" lg="3" class="font-field-label">
            <p class="mb-1">Arrival Time</p>
            <v-text-field v-model="searchArrivalTime" type="time" density="compact" variant="outlined"></v-text-field>
          </v-col>

          <!-- exit time -->
          <v-col cols="6" sm="6" md="3" lg="3" class="font-field-label">
            <p class="mb-1">Exit Time</p>
            <v-text-field v-model="searchExitTime" type="time" density="compact" variant="outlined"></v-text-field>
          </v-col>
        </v-row>

        <v-btn block :disabled="!isFormValid" :loading="isLoading" class="mb-4 mt-2" color="blue" size="large"
          variant="tonal" @click="submit">
          Find Parking
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

let menu = ref(false);
const isLoading = ref(false);
const isFormValid = ref(false);

const addresstoBeGeocoded = ref('');
const suggestions = reactive([]);
const emit = defineEmits(['search']);

let searchedAddress = ref(null);
let searchArrivalTime = ref('');
let searchExitTime = ref('');
let searchArrivalDate = ref('');
let searchExitDate = ref('');

const googleOptions = {
  api: 'https://maps.googleapis.com/maps/api/geocode/json',
  key: 'AIzaSyAoHmQZTE554p1lMwpZ4jQ6YZSct6lFY8Q', // Replace with your Google API key
  language: 'en'
};

async function geocodeAddress() {
  if (addresstoBeGeocoded.value.length >= 4) {
    const newSuggestions = await geoCode(addresstoBeGeocoded.value);
    suggestions.splice(0, suggestions.length, ...newSuggestions);
    menu.value = newSuggestions.length > 0;
  } else {
    menu.value = false;
  }
}

function selectGeocodedAddress(address) {
  addresstoBeGeocoded.value = address.label;
  searchedAddress.value = address.label;
  menu.value = false;
  isFormValid.value = true;
}

function onAddressClear() {
  menu.value = false;
  isFormValid.value = false;
}

async function geoCode(address) {
  if (address.length >= 4) {
    const encodedAddress = encodeURIComponent(address);
    const query = `?address=${encodedAddress}&key=${googleOptions.key}&language=${googleOptions.language}`;
    const response = await fetch(`${googleOptions.api}${query}`);
    const data = await response.json();

    if (data.results) {
      return data.results.map(result => ({ label: result.formatted_address }));
    } else {
      console.error('Error fetching geocode data:', data.error_message);
      return [];
    }
  }
  return [];
}

onMounted(() => {
  const now = new Date();
  searchArrivalDate.value = formatDate(now);
  searchExitDate.value = searchArrivalDate.value;

  const arrivalHours = now.getHours();
  const arrivalMinutes = now.getMinutes();
  searchArrivalTime.value = formatTime(arrivalHours, arrivalMinutes);

  const exitTime = new Date(now.getTime() + 4 * 60 * 60 * 1000);
  const exitHours = exitTime.getHours();
  const exitMinutes = exitTime.getMinutes();
  searchExitTime.value = formatTime(exitHours, exitMinutes);
});

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTime(hours, minutes) {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function submit() {
  emit('search', [searchedAddress.value, searchArrivalDate.value, searchArrivalTime.value, searchExitDate.value, searchExitTime.value]);
}
</script>

<style scoped>
.font-field-label {
  font-size: 1rem;
}

.text-primary {
  color: #007bff;
}
</style>
