// stores/newBuildingStore.ts
import { defineStore } from 'pinia'


export const useNewBuildingStore = defineStore('newBuildingStore', {
  state: () => ({
    newBuilding: {
		name: "Blackgate Penitentiary",
		addressLine1: "132 Blackgate Road",
		addressLine2: "",
		state: "VIC",
		country: "Australia",
		postcode: "3000",
		latitude: "-33.8567471",
		longitude: "151.2148263",
		contactName: "Warden Black",
		contactTel: "0412 654 123",
		contactEmail: "w.black@blackgate.com"
	}
  }),
  actions: {
    setNewBuilding(building) {
      this.newBuilding = building
    }
  }
})
