<template>
	<v-card class="shadow rounded">

		<!-- building image -->
		<v-row class="building-image-position">
			<v-card-item>
				<v-img :width="200" :height="300" cover src="/officebuilding2.jpg"></v-img>
			</v-card-item>
		</v-row>
	</v-card>
</template>


<script setup lang="js">
import { ref, watch } from "vue";
import { useBuildingStore } from "../stores/buildingStore";

// store
const buildingStore = useBuildingStore();


</script>


<style scoped lang="scss">
.building-image-position {
	// align-items: center;
	justify-content: center;
	// margin-top: 8px;
	// margin-bottom: 8px;
}
</style>
