// stores/buildingStore.ts
import { defineStore } from 'pinia'


export const useBuildingStore = defineStore('buildingStore', {
  state: () => ({
    building: [],
	recentChanges: []
  }),
  actions: {
    setBuilding(building) {
      this.building = building
    },
	setBuildingChanges(changes) {
		this.recentChanges = changes
	  }
  }
})
