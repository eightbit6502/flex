<template>
  <!-- <v-card class="mx-auto, mb-6 ml-4 mr-4 rounded-lg" hover flat min-width="90%" height=113px> -->
  <v-card class="rounded-lg" hover flat min-width="90%" height=113px>

    <v-row>

      <!-- image -->
      <v-col cols="3 ma-0 pa-0">
        <img src="/officebuilding2.jpg" width="100%" height="100%" class="mt-2" />
      </v-col>

      <!-- details -->
      <v-col>
        <v-row class="ml-n2 mt-0">
          <v-col cols="8">
            <p class="font-heading ml-n1" style="font-size: 1rem; line-height: 1.0;">{{ site.siteName }}</p>
            <p class="font-field-label ml-n1" style="font-size: 0.9rem;  line-height: 1.1;">{{ site.siteAddress }}</p>
            <p class="font-field-label ml-n1" style="font-size: 0.8rem;">{{ (site.siteDist / 1000).toFixed(2) + "km" }}
            </p>
          </v-col>
          <v-col class="mr-4 font-rate" style="">From <span class="font-rate-highlight">${{
            findLowestTotalCost(site).lowestCost }}</span>
          </v-col>
    </v-row>

    <!-- links -->
    <v-row class="mt-0">
      <v-col class="d-flex ">
        <v-btn variant="plain" class="ml-n4 font-button me-auto" color="#157FC" style="font-size: 11px; height:24px; color:#1570FC"
          :ripple="false">View Details</v-btn>
        <v-btn variant="flat" class="mr-3 font-button-bold" color="#1570FC" style="font-size: 11px; height:25px; font-weight: 700;">BOOK
          NOW</v-btn>
      </v-col>
    </v-row>

    </v-col>

    </v-row>

  </v-card>
</template>

<script setup lang="ts">
// outline
// title
// address
// distance
// price
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
// const siteName = ref(null)
defineProps(['site']);
// {
//     "siteId": 1,
//     "siteName": "Bat Cave",
//     "siteAddress": "7/26-28 Eaton Street",
//     "siteDist": 123,
//     "position": {
//         "lat": -33.8354,
//         "lng": 151.21392
//     },
//     "availableBays": [
//         {
//             "bayId": 1,
//             "bayName": "F1_11",
//             "selectedRate": [
//                 {
//                     "id": 1,
//                     "name": "Daily Batcave",
//                     "date": "2024-02-05",
//                     "value": 40,
//                     "type": "daily",
//                     "startTime": "03:00:00",
//                     "endTime": "12:00:00"
//                 },
//                 {
//                     "id": 2,
//                     "name": "Daily Batcave",
//                     "date": "2024-02-06",
//                     "value": 40,
//                     "type": "daily",
//                     "startTime": "03:00:00",
//                     "endTime": "12:00:00"
//                 }
//             ],
//             "totalCost": 80
//         }
//     ]
// }

// onMounted(() => {
//   input.value.focus()
// })

function findLowestTotalCost(data) {
  if (!data || !data.availableBays || data.availableBays.length === 0) {
    return null; // Or appropriate default value
  }

  let lowestCost = data.availableBays[0].totalCost;
  let lowestCostBay = data.availableBays[0];

  data.availableBays.forEach(bay => {
    if (bay.totalCost < lowestCost) {
      lowestCost = bay.totalCost;
      lowestCostBay = bay;
    }
  });

  return {
    lowestCost: lowestCost,
    bayId: lowestCostBay.bayId,
    bayName: lowestCostBay.bayName
  };
}


</script>

<style scoped>
.font-rate {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-size: 10px;
  font-weight: 400;
  text-align: right;
}

.font-rate-highlight {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-size: 16px;
  font-weight: 700;
}
</style>