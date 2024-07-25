// Import Pinia and the SearchParkingBayService
import { defineStore } from 'pinia';
import searchParkingService from '../services/dsearchParkingService';

// Define your store
export const searchParkingStore = defineStore({
    id: 'searchParkingBay',
    state: () => ({
        availableSites: []
    }),
    getters: {
        getAvailableSites: (state) => state.availableSites,
    },
    actions: {
        setAvailableSites(sites) {
            this.availableSites = sites;
        },
        async fetchAvailableSites(payload) {
            try {
                console.log("Fetching data...");
                const data = await searchParkingService.fetchAvailableSites(payload);
                console.log(data);
                // Update the store
                this.setAvailableSites(data.availableSites);
            } catch (error) {
                console.error('Failed to fetch available parking bays:', error);
            }
        }
    }
});
