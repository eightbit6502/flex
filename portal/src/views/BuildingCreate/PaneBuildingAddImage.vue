<template>
	<v-card class="shadow rounded">

		<v-card-text>
			<v-container>
				<v-row>
					<v-col>
						<v-card-title class="ml-n3">Building Image</v-card-title>
						<v-card-item>

							<div class="file-upload">
								<div>
									<v-img v-if="showImage" :width="260" :height="360" cover :src="imageData"></v-img>
								</div>
							</div>

							<div v-if="!showImage" class="file-upload">
								<div class="file-upload__area">
									<p>Image Preview</p>
								</div>
							</div>
						</v-card-item>
					</v-col>
				</v-row>


				<v-row>
					<v-col>
						<h5 style="margin-bottom: 8px;">Filename</h5>
						<v-file-input density="compact" variant="outlined" clearable v-model="chosenFile"
							@update:modelValue="checkImage" @click:clear="clearImage"
							accept="image/png, image/jpeg, image/bmp" label="Image"></v-file-input>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>

	</v-card>
</template>


<script setup lang="js">
import { ref, watch, defineModel } from "vue";
import { useNewBuildingStore } from "@/stores/newBuildingStore";

// stores
const newBuildingStore = useNewBuildingStore();

// props

// refs
const chosenFile = ref(null);
const imageData = ref(null);
const showImage = ref(false);

// emits

// model


//
let reader = new FileReader();

//
const checkImage = (data) => {
	// console.log(data);

	if (data) {
		reader.readAsDataURL(data);
		reader.onload = () => {
			imageData.value = reader.result;
			showImage.value = true;
		}
	}
}

const clearImage = () => {
	reader.abort();
	imageData.value = null;
	showImage.value = false;
}

// emits --------------------



</script>


<style scoped lang="scss">
// detail pane
.card-title {
	color: rgb(var(--v-theme-primary)) !important;
	display: block;
	margin-left: 15px;
}

.card-content {
	color: rgb(var(--v-theme-primary)) !important;
	display: block;
}


.image-position-fix {
	display: flex;
	justify-content: center;

	width: 260px;
	height: 360px;
}

.file-upload {
	display: flex;
	justify-content: center;
}

.file-upload .file-upload__area {
	width: 260px;
	min-height: 360px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 3px dashed #ccc;
	margin-top: 10px;
	margin-bottom: 10px;
}
</style>
