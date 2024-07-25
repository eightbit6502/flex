<template>
	<v-app class="overflow-hidden">
		<router-view></router-view>
	</v-app>
</template>


<script setup lang="ts">

</script>


<!-- set some base / reusable styles for the app so no scope applied -->
<style lang="scss">
html {
	overflow-y: auto !important;
}

.v-application--wrap {
	min-height: 100% !important;
}

body {
	font-family: var(--v-font-body);
	font-size: var(--v-font-size-p);
	color: rgb(var(--v-font-color-body));
}



h2 {
	font-family: var(--v-font-heading);
	font-size: var(--v-font-size-h2);
	color: rgb(var(--v-font-color-body));
	font-weight: 500;
}

h3 {
	font-family: var(--v-font-heading);
	font-size: var(--v-font-size-h3);
	color: rgb(var(--v-font-color-body));
	font-weight: 500;
}

h4 {
	font-family: var(--v-font-heading);
	font-size: var(--v-font-size-h4);
	color: rgb(var(--v-font-color-body));
	font-weight: 500;
}

h5 {
	font-family: var(--v-font-heading);
	font-size: var(--v-font-size-h5);
	color: rgb(var(--v-font-color-body));
	font-weight: 500;
}

p {
	font-family: var(--v-font-body);
	font-size: var(--v-font-size-p);
	color: rgb(var(--v-font-color-body));
}

.shadow {
	box-shadow: var(--v-standard-shadow) !important;
}

.rounded {
	border-radius: var(--v-standard-rounded) !important;
}

.bg {
	background: linear-gradient(var(--v-page-bg)) !important;
}
</style>
