<template>
	<!-- custom app bar -->
	<div class="app-bar-style">
		<v-row>
			<v-col>
				<v-app-bar-nav-icon v-show="mobile" :ripple="false"
					@click="toggleNavigationDrawer"></v-app-bar-nav-icon>
			</v-col>

			<v-spacer class="d-none d-md-flex"></v-spacer>

			<!-- right aligned toolbar buttons -->
			<v-col style="text-align: right;">

				<!-- theme  -->
				<v-menu class="shadow" width="150px" style="padding: 10px 16px" rounded location="bottom start"
					origin="auto" :elevation="0">
					<template v-slot:activator="{ props }">
						<v-btn class="nav-btn" :elevation="0" v-bind="props" icon>
							<v-icon v-if="theme.global.name.value === 'themeLight'"
								class="icon-color">mdi-white-balance-sunny</v-icon>
							<v-icon v-if="theme.global.name.value === 'themeDark'"
								class="icon-color">mdi-weather-night</v-icon>
							<v-icon v-if="theme.global.name.value === 'themeSystem'"
								class="icon-color">mdi-monitor</v-icon>
							<v-icon v-if="theme.global.name.value === 'themeCBA'" class="icon-color">mdi-bank</v-icon>
						</v-btn>
					</template>

					<v-card style="margin-top:10px;">
						<v-card-text class="card-style">
							<v-btn class="card-button text-none" prepend-icon="mdi-white-balance-sunny" variant="text"
								@click="setTheme('themeLight')">Light</v-btn>
							<v-btn class="card-button text-none" prepend-icon="mdi-weather-night" variant="text"
								@click="setTheme('themeDark')">Dark</v-btn>
							<v-btn class="card-button text-none" prepend-icon="mdi-monitor" variant="text"
								@click="setTheme('themeSystem')">System</v-btn>
							<v-btn class="card-button text-none" prepend-icon="mdi-bank" variant="text"
								@click="setTheme('themeCBA')">CommBank</v-btn>
						</v-card-text>
					</v-card>
				</v-menu>


				<v-btn class="nav-btn" :elevation="0" icon>
					<v-icon class="icon-color">mdi-apps</v-icon>
				</v-btn>

				<v-btn class="nav-btn" :elevation="0" icon>
					<v-icon class="icon-color">mdi-bell-outline</v-icon>
				</v-btn>


				<!-- avatar  -->
				<v-menu width="224px shadow" rounded location="bottom end" origin="auto" :elevation="0">
					<template v-slot:activator="{ props }">
						<v-btn class="" flat icon v-bind="props">
							<v-avatar color="primary">
								<span class="text-h6">{{ userInitials }}</span>
							</v-avatar>
						</v-btn>
					</template>

					<v-card style="margin-top:10px;">
						<v-card-text class="card-style">
							<div class="d-flex align-center card-item-style">
								<v-avatar color="primary">
									<span class="text-h6">{{ userInitials }}</span>
								</v-avatar>
								<div class="ml-3 mt-1">
									<h3>{{ authStore.user.firstName + ' ' + authStore.user.lastName }}</h3>
									<p class="text-caption mt-n1">{{ authStore.user.role }}</p>
								</div>
							</div>

							<v-divider class="my-3"></v-divider>

							<v-btn class="card-button text-none" prepend-icon="mdi-account-outline" variant="text">My
								Profile</v-btn>
							<v-btn class="card-button text-none" prepend-icon="mdi-cog-outline"
								variant="text">Settings</v-btn>

							<v-divider class="my-3"></v-divider>

							<v-btn class="card-button text-none" prepend-icon="mdi-help-circle-outline"
								variant="text">FAQ</v-btn>

							<v-btn class="card-logout-button text-none" prepend-icon="mdi-logout" color="primary">Sign
								Out</v-btn>
						</v-card-text>
					</v-card>
				</v-menu>

			</v-col>
		</v-row>
	</div>
</template>




<script setup lang="js">
import { computed } from 'vue';
import { useDisplay, useTheme } from 'vuetify'
import { useNavigationDrawerStore } from '../stores/navigationDrawerStore';
import { useAuthStore } from '../stores/authStore';


const theme = useTheme()
const { mobile } = useDisplay();
const authStore = useAuthStore();

const navigationDrawerStore = useNavigationDrawerStore();
const toggleNavigationDrawer = navigationDrawerStore.toggleNavigationDrawer;
const showNavigationDrawer = computed(() => navigationDrawerStore.showNavigationDrawer);

const setTheme = (themeName) => {
	theme.global.name.value = themeName;
	console.log(`Theme changed to: ${theme.global.name.value}`);
}

const appBarWidth = computed(() => {
	return showNavigationDrawer.value ? 'calc(100% - 300px)' : 'calc(100% - 40px)';
});


const getUserInitials = (firstName, lastName) => {
	const firstInitial = firstName.charAt(0).toUpperCase();
	const lastInitial = lastName.charAt(0).toUpperCase();
	return `${firstInitial}${lastInitial}`;
};

const userInitials = computed(() => {
	return authStore.user ? getUserInitials(authStore.user.firstName, authStore.user.lastName) : '';
});


</script>




<!-- styles -->
<style scoped lang="scss">
.app-bar-style {
	background-color: rgb(var(--v-appbar-background));
	max-width: var(--v-max-body-width);
	height: 64px;

	margin-top: 25px;
}

.card-style {
	padding: 0;
}

.card-item-style {
	margin: 20px 16px 0px 16px;
}

.card-button {
	width: 100%;
	color: rgb(var(--v-font-color-body)) !important;
	padding-left: 20px;
	justify-content: start
}

.card-logout-button {
	width: calc(100% - 32px);
	margin: 15px 16px 20px 16px;
}

.icon-color {
	color: rgb(var(--v-font-color-body));
}

.nav-btn {
	background-color: rgb(var(--v-theme-background)) !important;
}
</style>
