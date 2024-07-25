<template>
	<v-navigation-drawer :class="navClass" :rail="!showNavigationDrawer" :expand-on-hover="!showNavigationDrawer"
		rail-width="71" location="left" :width="260">
		<!-- logo -->
		<div class="nav-logo">
			<v-row>
				<v-col cols="3">
					<img v-if="theme.global.name.value === 'themeCBA'" width="50px" src="/public/cba-logo.png"></img>

					<svg v-else class="nav-logo-position" width="60" height="57" viewBox="0 0 258 242" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M150.102 38.2706C92.1024 31.8706 30.6024 77.7705 30.6024 107.271C29.8046 135.214 105.602 221.271 143.602 189.271C181.602 157.271 211.437 120.326 212.937 101.326C215.27 85.9928 208.102 44.6706 150.102 38.2706Z"
							fill="url(#paint0_linear_327_536)" fill-opacity="0.5" />
						<path
							d="M80.3234 55.4202C44.6969 101.634 42.9625 171.87 67.2863 188.561C97.6893 209.422 213.906 181.642 209.022 132.203C204.138 82.765 176.745 50.0369 161.928 38.0497C150.605 27.45 118.232 6.24577 80.3234 55.4202Z"
							fill="url(#paint1_linear_327_536)" />
						<path
							d="M63.8727 158.479C102.789 201.959 171.522 216.513 192.382 195.653C218.453 169.58 212.402 50.2419 162.905 45.9993C113.407 41.7566 76.2202 62.6992 61.7245 75.0736C49.2323 84.266 22.4634 112.213 63.8727 158.479Z"
							fill="url(#paint2_linear_327_536)" />
						<path
							d="M182.791 53.8439C131.435 26.1393 51.8394 35.7581 39.2905 62.4561C23.6076 95.8261 69.7726 206.039 117.775 193.243C165.778 180.448 203.659 148.134 213.099 131.577C221.733 118.693 237.437 83.3234 182.791 53.8439Z"
							fill="url(#paint3_linear_327_536)" fill-opacity="0.8" />
						<path
							d="M204.965 132.831C211.365 74.8311 165.465 13.3311 135.965 13.3311C108.022 12.5332 21.9652 108.331 53.9652 146.331C85.9652 184.331 131.965 196.831 150.965 198.331C166.299 200.664 198.565 190.831 204.965 132.831Z"
							fill="url(#paint4_linear_327_536)" fill-opacity="0.9" />
						<path
							d="M107 71H126.82V158.387C126.82 158.387 119.613 157.937 114.207 153.883C108.802 149.829 107 143.973 107 143.973V71Z"
							fill="white" />
						<path
							d="M107 71L107 90.8198L170.063 90.8198C170.063 90.8198 169.622 83.6126 165.651 78.2072C161.681 72.8018 155.946 71 155.946 71L107 71Z"
							fill="white" />
						<path
							d="M107 124.152L107 104.333L155.649 104.333C155.649 104.333 155.214 111.54 151.3 116.945C147.386 122.351 141.733 124.152 141.733 124.152L107 124.152Z"
							fill="white" />
						<defs>
							<linearGradient id="paint0_linear_327_536" x1="215.91" y1="116.983" x2="30.5962"
								y2="116.983" gradientUnits="userSpaceOnUse">
								<stop stop-color="#34A1DA" stop-opacity="0.5" />
								<stop offset="1" stop-color="#666CFF" stop-opacity="0.7" />
							</linearGradient>
							<linearGradient id="paint1_linear_327_536" x1="182.972" y1="51.7131" x2="72.025"
								y2="190.198" gradientUnits="userSpaceOnUse">
								<stop stop-color="#9EABFF" stop-opacity="0.6" />
								<stop offset="0.274397" stop-color="#AEC8ED" stop-opacity="0.7" />
								<stop offset="1" stop-color="#70EDFB" stop-opacity="0.9" />
							</linearGradient>
							<linearGradient id="paint2_linear_327_536" x1="79.0071" y1="56.8846" x2="194.858"
								y2="191.294" gradientUnits="userSpaceOnUse">
								<stop stop-color="#9EABFF" stop-opacity="0.6" />
								<stop offset="0.274397" stop-color="#AEC8ED" stop-opacity="0.7" />
								<stop offset="1" stop-color="#70EDFB" stop-opacity="0.9" />
							</linearGradient>
							<linearGradient id="paint3_linear_327_536" x1="193.009" y1="154.55" x2="38.4395"
								y2="67.3968" gradientUnits="userSpaceOnUse">
								<stop stop-color="#9EABFF" stop-opacity="0.6" />
								<stop offset="0.274397" stop-color="#AEC8ED" stop-opacity="0.7" />
								<stop offset="1" stop-color="#70EDFB" stop-opacity="0.9" />
							</linearGradient>
							<linearGradient id="paint4_linear_327_536" x1="126.253" y1="198.64" x2="126.253"
								y2="13.3262" gradientUnits="userSpaceOnUse">
								<stop stop-color="#34A1DA" stop-opacity="0.5" />
								<stop offset="1" stop-color="#666CFF" stop-opacity="0.7" />
							</linearGradient>
						</defs>
					</svg>

				</v-col>

				<v-col v-if="showNavigationDrawer" class="d-flex align-center">
					<p class="nav-text">FlexPark</p>
				</v-col>
			</v-row>

		</div>

		<!-- hide/show -->
		<div class="drawer_toggle">
			<svg :style="computedStyle" width="24" height="24" @click="toggleNavigationDrawer" viewBox="0 0 24 24"
				fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="drawer-toggle-svg"
					d="M8.47365 11.7183C8.11707 12.0749 8.11707 12.6531 8.47365 13.0097L12.071 16.607C12.4615 16.9975 12.4615 17.6305 12.071 18.021C11.6805 18.4115 11.0475 18.4115 10.657 18.021L5.83009 13.1941C5.37164 12.7356 5.37164 11.9924 5.83009 11.5339L10.657 6.707C11.0475 6.31653 11.6805 6.31653 12.071 6.707C12.4615 7.09747 12.4615 7.73053 12.071 8.121L8.47365 11.7183Z"
					fill-opacity="0.9"></path>
				<path class="drawer-toggle-svg"
					d="M14.3584 11.8336C14.0654 12.1266 14.0654 12.6014 14.3584 12.8944L18.071 16.607C18.4615 16.9975 18.4615 17.6305 18.071 18.021C17.6805 18.4115 17.0475 18.4115 16.657 18.021L11.6819 13.0459C11.3053 12.6693 11.3053 12.0587 11.6819 11.6821L16.657 6.707C17.0475 6.31653 17.6805 6.31653 18.071 6.707C18.4615 7.09747 18.4615 7.73053 18.071 8.121L14.3584 11.8336Z"
					fill-opacity="0.4"></path>
			</svg>
		</div>

		<!-- side nav menu entries -->
		<v-list density="compact" class="nav-items" nav>
			<v-list-item class="menu_entry" activeClass="menu_entry_active" to="/" :ripple="false"
				prepend-icon="mdi-view-dashboard-outline" title="Dashboard"></v-list-item>

			<CompNavItemHeading v-show="showNavigationDrawer" title="Building & Carpark"></CompNavItemHeading>

			<!-- nav items -->
			<v-list-item class="menu_entry" activeClass="menu_entry_active" to="/building" :ripple="false"
				prepend-icon="mdi-office-building-outline" title="Building"></v-list-item>
			<v-list-item class="menu_entry" activeClass="menu_entry_active" to="/tenant" :ripple="false"
				prepend-icon="mdi-account-details-outline" title="Tenant"></v-list-item>
			<v-list-item class="menu_entry" activeClass="menu_entry_active" to="/site" :ripple="false"
				prepend-icon="mdi-boom-gate-up-outline" title="Site"></v-list-item>
			<v-list-item class="menu_entry" activeClass="menu_entry_active" to="/bay" :ripple="false"
				prepend-icon="mdi-car-outline" title="Bays"></v-list-item>
			<v-list-item class="menu_entry" activeClass="menu_entry_active" to="/rate" :ripple="false"
				prepend-icon="mdi-invoice-text-clock-outline" title="Rates"></v-list-item>
			<v-list-item class="menu_entry" activeClass="menu_entry_active" to="/device" :ripple="false"
				prepend-icon="mdi-devices" title="Devices"></v-list-item>

			<CompNavItemHeading v-show="showNavigationDrawer" title="User & Groups"></CompNavItemHeading>
			<v-list-item class="menu_entry" activeClass="menu_entry_active" to="/user" :ripple="false"
				prepend-icon="mdi-account-outline" title="Users"></v-list-item>
			<v-list-item class="menu_entry" activeClass="menu_entry_active" to="/group" :ripple="false"
				prepend-icon="mdi-select-group" title="Groups"></v-list-item>

		</v-list>
	</v-navigation-drawer>
</template>


<!-- scripts -->
<script setup lang="js">
import { useTheme } from 'vuetify';
import { computed, ref } from 'vue';
import { useNavigationDrawerStore } from '../stores/navigationDrawerStore';

const navigationDrawerStore = useNavigationDrawerStore();
const showNavigationDrawer = computed(() => navigationDrawerStore.showNavigationDrawer);
const toggleNavigationDrawer = navigationDrawerStore.toggleNavigationDrawer;

const theme = useTheme()

const computedStyle = computed(() => {
	return {
		transform: 'rotate(' + (showNavigationDrawer.value ? 0 : 0.5) + 'turn)',
		transition: 'transform 0.5s ease'
	};
});

const navClass = computed(() => {
	const themeId = theme.current.value;

	const navShadow = themeId.variables['nav-shadow'];

	return {
		'nav-style': true,
		'shadow': navShadow == "true",
	};
});


</script>


<!-- styles -->
<style scoped lang="scss">
.nav-style {
	background-color: rgb(var(--v-nav-background-color));

	border-top-color: rgb(var(--v-nav-border-color));
	border-right-color: rgb(var(--v-nav-border-color));
	border-bottom-color: rgb(var(--v-nav-border-color));
	border-left-color: rgb(var(--v-nav-border-color));

	box-shadow: var(--v-menu-entry-shadow);
}

.nav-logo {
	font-family: var(--v-body-font-family);
	font-size: var(--v-font-size-nav);
	font-weight: 600;
	color: rgb(var(--v-font-body-color));
	margin-left: 16px;
	padding-top: 16px;
	margin-bottom: 10px;
}

.nav-logo-position {
	margin-left: -11px;
	margin-top: 5px;
}

.nav-text {
	margin-left: -15px;
	margin-top: -5px;
	font-size: 20px;
	color: rgb(var(--v-nav-item-color));
}

.drawer_toggle {
	position: relative;
	top: -61px;
	right: -216px;
}

.drawer-toggle-svg {
	fill: rgb(var(--v-nav-item-color));
}

.nav-items {
	top: -38px;
}

.menu_entry {
	border-radius: .375rem;
	margin-left: 4px;
	margin-right: 4px;
	padding-left: 12px;
	padding-right: 12px;
	padding-top: 7px;
	padding-bottom: 7px;
	color: rgb(var(--v-font-color-body)) !important;

	//todo fix style opacity from vuetify
	opacity: 1 !important;
}


.menu_entry :deep(.v-list-item-title) {
	font-size: var(--v-font-size-menu);
	font-weight: 400;
}

.menu_entry :deep(.v-icon) {
	//todo fix style opacity from vuetify
	opacity: 1 !important;
}

.menu_entry :deep(.v-list-item__spacer) {
	width: 10px !important;
}

// fix for the weird indent in submenus and bring icon size down
.submenu_entry_fix :deep(.v-list-item__prepend) {
	margin-left: -25px;
	font-size: 10px;
}

.menu_entry_active {
	color: rgb(var(--v-font-color-active-menu)) !important;
	background-color: rgb(var(--v-theme-primary));
	box-shadow: 0 .125rem .375rem 0 rgba(38, 43, 67, .14);
}

.menu_secondary_active {
	background-color: rgba(var(--v-menu-group-active), 0.2);
}

.menu_entry_active :deep(.v-list-item__overlay) {
	display: none;
}
</style>
