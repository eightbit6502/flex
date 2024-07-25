<template>
	<v-col cols="12" md="3">
		<v-card class="mx-auto shadow rounded ban">
			<v-card-item class="card-content">
				<div class="text-content">
					<p class="title">{{ title }}</p>
				</div>
				<v-avatar size="50" class="avatar">
					<v-icon class="card-icon">{{ icon }}</v-icon>
				</v-avatar>
				<div class="bottom-content">
					<h4 class="value">{{ value }}</h4>
					<v-row>
						<v-col style="display: flex;">
							<p class="comparison-text">{{ comparisonText }}</p>

							<v-chip v-if="comparisonText" class="pill"
								:class="{ 'positive': comparisonPositive, 'negative': !comparisonPositive }">
								<p class="">{{ comparisonValue }}</p>
							</v-chip>
							<div v-if="!comparisonText" style="height: 28px"></div>
						</v-col>
					</v-row>
				</div>
			</v-card-item>
		</v-card>
	</v-col>
</template>



<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
	title: String,
	value: [String, Number],
	subtitle: String,
	icon: String,
	comparisonValue: [String, Number],
	comparisonText: String,
	comparisonPositive: Boolean,
})
</script>


<style scoped lang="scss">
.card-content {
	height: 136px;
}

.text-content {
	margin-top: -5px;
}

.title {
	font-size: 16px;
	font-weight: 400;
	color: rgba(var(--v-font-color-body), 0.8);
}

.avatar {
	position: absolute;
	top: 20px;
	right: 20px;
	background-color: rgba(var(--v-font-color-body), 0.1);
	border-radius: 8px !important;
}

.card-icon {
	color: rgb(var(--v-font-color-body));
	font-size: 28px;
}

.bottom-content {
	margin-top: auto;
	padding-top: 10px;
}

.value {
	display: flex;
	align-items: center;
	font-size: 28px;
	font-weight: 500;
	color: rgb(var(--v-font-color-body));

	margin: -5px 0 0 0;
}

.pill {
	margin-left: 5px;
	margin-top: 4px;
	border-radius: 6px;

	height: 25px !important;
}

.positive {
	color: rgb(40, 199, 111);
}

.positive p {
	font-size: 13px;
	font-weight: 500;
	color: rgb(40, 199, 111);
}

.negative {
	color: rgb(255, 76, 81);
}

.negative p {
	font-size: 13px;
	font-weight: 500;
	color: rgb(255, 76, 81);
}

.comparison-text {
	font-size: 14px;
	font-weight: 400;
	color: rgba(var(--v-font-color-body), 0.8);

	margin-top: 5px;
	// margin-bottom: -5px;
}

.pill {}
</style>
