<template>
	<v-row style="width: 150px;">
		<v-col style="padding-right: 0;">
			<v-chip class="rounded chip-size-adjust">
				<v-icon size="24px" :icon="icon"></v-icon>
			</v-chip>
		</v-col>
		<v-col style="padding-left: 0; margin-left:-5px">
			<h5 style="font-size: var(--v-font-size-h5); margin-top: -2px;">{{ stat }}</h5>
			<p style="margin-top: -4px; font-size: 14px;">{{ subheading }}</p>
		</v-col>
	</v-row>
</template>

<!-- scripts -->
<script setup lang="js">
import { defineProps } from 'vue';

const props = defineProps({
	stat: {
		type: String,
		required: true
	},
	subheading: {
		type: String,
		required: true
	},
	icon: {
		type: String,
		required: true
	}
});
</script>


<!-- styles -->
<style scoped lang="scss">
.chip-size-adjust {
	height: 40px;
	background-color: rgba(var(--v-font-color-heading-menu), 0.2);
	color: rgb(var(--v-font-color-heading-menu));
}
</style>
