<script setup lang="ts">

</script>

<template>
	<v-app class="overflow-hidden">
		<router-view></router-view>
	</v-app>
</template>

<style>
html {
	overflow-y: auto !important
}

.v-application--wrap {
	min-height: 100% !important;
}

.font-heading {
	font-family: "Montserrat", sans-serif;
	font-optical-sizing: auto;
	font-weight: 700;
	font-style: bold;
	font-variation-settings:
		"wdth" 100;

	color: black;
}

.font-subheading {
	font-family: "Montserrat", sans-serif;
	font-optical-sizing: auto;
	font-weight: 400;
	font-style: normal;
	font-variation-settings:
		"wdth" 100;

	color: black;
}

.font-field-label {
	font-family: "Open Sans", sans-serif;
	font-optical-sizing: auto;
	font-weight: 400;
	font-style: normal;
	font-variation-settings:
		"wdth" 100;
}

.font-button-bold {
	font-family: "Open Sans", sans-serif;
	font-optical-sizing: auto;
	font-weight: 700;
	font-style: normal;
	font-variation-settings:
		"wdth" 100;
}

.font-button {
	font-family: "Open Sans", sans-serif;
	font-optical-sizing: auto;
	font-weight: 400;
	font-style: normal;
	font-variation-settings:
		"wdth" 100;
}

.font-open-sans {
	font-family: "Open Sans", sans-serif;
	font-optical-sizing: auto;
	font-weight: 400;
	font-style: normal;
	font-variation-settings:
		"wdth" 100;
}

.font-montserrat {
	font-family: "Montserrat", sans-serif;
	font-optical-sizing: auto;
	font-weight: 400;
	font-style: normal;
}
</style>
