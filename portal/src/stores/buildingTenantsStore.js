// stores/buildingStore.ts
import { defineStore } from 'pinia'


export const useBuildingTenantsStore = defineStore('buildingTenantsStore', {
  state: () => ({
    buildingTenants: [],
    otherTenants: []
  }),
  actions: {
    setBuildingTenants(tenants) {
      this.buildingTenants = tenants
    },
    setOtherTenants(tenants) {
      this.otherTenants = tenants
    }
  }
})
