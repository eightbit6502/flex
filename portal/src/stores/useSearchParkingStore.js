// src/store/useSearchParkingStore.js

import { defineStore } from 'pinia';

export const useSearchParkingStore = defineStore({
  id: 'searchParking', // Unique identifier for the store
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
  }
});