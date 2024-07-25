import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

// Import views
import Home from "../views/Home.vue";

// auth related
import SignIn from "../views/SignIn.vue";
import Reset from "../views/Reset.vue";
import Forgot from "../views/Forgot.vue";

// building related
import Building from "../views/Building/Building.vue";
import BuildingDetail from "../views/BuildingDetail/BuildingDetail.vue";
import BuildingCreate from "../views/BuildingCreate/BuildingCreate.vue";
import BuildingLog from "../views/BuildingLog/BuildingLog.vue";
import BuildingSettings from "../views/BuildingSettings/BuildingSettings.vue";

import Tenant from "../views/Tenant.vue";
import Site from "../views/Site.vue";
import Bay from "../views/Bay.vue";
import Rate from "../views/Rate.vue";
import Device from "../views/Device.vue";
import User from "../views/User.vue";
import Group from "../views/Group.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
			// beforeEnter: (to, from, next) => {
			//   const authStore = useAuthStore();
			//   if (authStore.user) {
			//     next();
			//   } else {
			//     next({ path: '/signin' });
			//   }
			// },
		},
		{
			path: "/signin",
			name: "signin",
			component: SignIn,
		},
		{
			path: "/reset/:token",
			name: "reset",
			component: Reset,
		},
		{
			path: "/forgot",
			name: "forgot",
			component: Forgot,
		},

		{
			path: "/building",
			name: "building",
			component: Building,
		},
		{
			path: "/building/create",
			name: "building-create",
			component: BuildingCreate,
		},
		{
			path: "/building/:id/logs",
			name: "building-logs",
			component: BuildingLog,
		},
		{
			path: "/building/:id/settings",
			name: "building-settings",
			component: BuildingSettings,
		},
		{
			path: "/building/:id",
			name: "building-detail",
			component: BuildingDetail,
		},

		// error shut up
		{
			path: "/tenant",
			name: "tenant",
			component: Tenant,
		},
		{
			path: "/site",
			name: "site",
			component: Site,
		},
		{
			path: "/bay",
			name: "bay",
			component: Bay,
		},
		{
			path: "/rate",
			name: "rate",
			component: Rate,
		},
		{
			path: "/device",
			name: "device",
			component: Device,
		},
		{
			path: "/user",
			name: "user",
			component: Building,
		},
		{
			path: "/group",
			name: "group",
			component: Group,
		},
	],
});

export default router;
