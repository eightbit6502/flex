<template>

	<v-card class="mx-auto base shadow rounded">
		<!-- <v-card-item class="card-content">
          <div class="text-content">
            <p class="title">{{ title }}</p>
            <p class="subtitle">{{ subtitle }}</p>
          </div>
          <v-icon class="card-icon">{{ icon }}</v-icon>
          <div class="bottom-content">
            <h4 class="value">{{ value }} <span :class="{'positive': comparisonPositive, 'negative': !comparisonPositive}">{{ comparisonValue }}</span></h4>
            <p class="comparison-text">{{ comparisonText }}</p>
          </div>
        </v-card-item> -->
	</v-card>

</template>



<script setup lang="ts">
import { defineProps } from 'vue'

// const props = defineProps({
//   title: String,
//   value: [String, Number],
//   subtitle: String,
//   icon: String,
//   comparisonValue: [String, Number],
//   comparisonText: String,
//   comparisonPositive: Boolean,
// })
</script>


<style scoped lang="scss">
.base {
	height: 672px;
}

.card-content {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 136px;

	padding: 20px 16px;
}

.text-content {
	// padding: 20px 16px;
}

.title {
	margin: 0;
	font-size: 15px;
	font-weight: 400;
}

.subtitle {
	margin: 0;
	font-size: 13px;
	color: var(--font-color-heading-menu);
}

.card-icon {
	position: absolute;
	top: 16px;
	right: 16px;
	font-size: 36px;
}

.bottom-content {
	margin-top: auto;
	padding-top: 10px;
}

.value {
	display: flex;
	align-items: center;
	font-size: 26px;
	margin: 5px 0 0 0;
}

.positive {
	font-size: 14px;
	color: green;
	margin-left: 8px;
}

.negative {
	font-size: 14px;
	color: red;
	margin-left: 8px;
}

.comparison-text {
	font-size: 12px;
	color: var(--font-color-heading-menu);
	margin: 0;
}
</style>
