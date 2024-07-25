<script setup lang="ts">

const links = [
'Find Parking',
'Offers & Events',
'About Us',
'Contact Us',
]
</script>

<template>
	<v-app-bar
	flat
	density="compact"
	>
	<template v-slot:prepend>
		<v-app-bar-nav-icon></v-app-bar-nav-icon>
	</template>
	
	<v-spacer></v-spacer>
	
	<v-tabs
	md="7"
	sm="1"
	centered
	color="grey-darken-2"
	>
	<v-tab
	v-for="link in links"
	:key="link"
	:text="link"
	></v-tab>
</v-tabs>


<v-spacer></v-spacer>

<!-- <v-btn icon>
	<v-icon>mdi-magnify</v-icon>
</v-btn>

<v-btn icon>
	<v-icon>mdi-heart</v-icon>
</v-btn> -->

<v-avatar
color="grey-darken-1"
class="hidden-md-and-up"
size="32"
></v-avatar>

<v-avatar
class="hidden-sm-and-down"
color="grey-darken-1"
size="32"
></v-avatar>
</v-app-bar>
</template>