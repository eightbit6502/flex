// stores/buildingSitesStore.ts
import { defineStore } from 'pinia'


export const useBuildingSitesStore = defineStore('buildingSitesStore', {
  state: () => ({
    buildingSites: [],
	otherSites: []
  }),
  actions: {
    setBuildingSites(sites) {
      this.buildingSites = sites
    },
	setOtherSites(sites) {
		this.otherSites = sites
	  }
  }
})
