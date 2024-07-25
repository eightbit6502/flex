<template>
	<div class="menu_title">
		<p class="menu_title-text">{{ title }}</p>
	</div>
</template>

<!-- scripts -->
<script setup lang="js">
import { defineProps } from 'vue';

const props = defineProps({
	title: {
		type: String,
		required: true
	}
});
</script>


<!-- styles -->
<style scoped lang="scss">
.menu_title {
	margin-top: 20px;
	padding-top: 6px;
	padding-bottom: 7px;
	padding-left: 7px
}

.menu_title-text {
	text-transform: uppercase;
	font-size: 13px;
	margin: 0;
	padding: 0 0px;
	white-space: nowrap;
	display: flex;
	align-items: center;
	position: relative;
	color: rgb(var(--v-font-color-heading-menu));
}
</style>
