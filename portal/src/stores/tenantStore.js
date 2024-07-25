// stores/tenantStore.ts
import { defineStore } from 'pinia'


export const useTenantStore = defineStore('tenantStore', {
  state: () => ({
    tenant: [],
    tenants: []
  }),
  actions: {
    setTenant(tenant) {
      this.tenant = tenant
    },

    setTenants(tenants) {
      this.tenants = tenants
    }
  }
})
