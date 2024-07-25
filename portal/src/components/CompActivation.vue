<template>
	<v-card class="mx-auto pa-4" elevation="0" max-width="800" rounded="lg">
		<v-card-text>
			<h4 class="text-h4">Welcome to FlexPark!</h4>
			<p>You're almost there!</p>
		</v-card-text>

		<v-card-text>
			<p style="max-width: 500px;">We're revving up your account setup. To cross the finish line,
				please check your email (<b>{{ signupEmail }}</b>). <br /><br /> We've sent you an
				activation code &#45; just enter that code here and you'll be all set to park with ease!</p>
		</v-card-text>

		<v-card-text v-if="showFormError" class="text-signin-error">{{ formErrorMessage }}</v-card-text>

		<v-otp-input autofocus style="justify-content: left;" v-model="otpcode" variant="solo"></v-otp-input>

		<v-btn :disabled="otpcode.length != 6" @click="emitSubmit" :loading="isFormLoading" color="blue"
			class="mt-4 ml-2" height="40" text="Verify" variant="flat" width="70%"></v-btn>

		<!-- <v-card-text>
            <v-card-text class="text-center">
                <p>No email in your inbox or spam folder?</p>
                <RouterLink to="/signin" class="text-blue text-decoration-none">Let’s resend it. <v-icon
                        icon="mdi-chevron-right"></v-icon></RouterLink>
            </v-card-text>
        </v-card-text> -->
	</v-card>
</template>


<script setup lang="js">
import { ref } from 'vue'

let otpcode = ref('');
const emit = defineEmits(['submit']);
const props = defineProps({
	formErrorMessage: String,
	showFormError: Boolean,
	isFormLoading: Boolean
});

const emitSubmit = () => {
	emit('submit', otpcode.value); // Emit the OTP value to the parent
};

</script>



<style scoped>
.text-h4 {
	font-size: 1.375rem !important;
	font-weight: 500;
	line-height: 1.875rem;
	letter-spacing: normal !important;
	font-family: Public Sans, sans-serif, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol !important;
	text-transform: none !important;
}

.text-signin-error {
	/* font-size: 1.375rem !important; */
	font-weight: 500;
	color: red;
	font-family: Public Sans, sans-serif, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol !important;
}
</style>
