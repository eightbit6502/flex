<!-- markup -->

<template>
	<!-- navigation -->
	<CompNavigation></CompNavigation>
	
	<v-row>

		<!-- ad -->
		<v-col md="8" class="hidden-sm-and-down" style=" background-color: #cecece">

		</v-col>

		<!-- reset panel -->
		<v-col class="d-flex align-center justify-center" style="background-color: #ffffff">
			<v-card class="mx-auto pa-4" elevation="0" max-width="800" rounded="lg">
				<div v-if="!resetPasswordSent">
					<v-card-text>
						<h4 class="text-h4">Lost Your Password? No Sweat!</h4>
						<p>Pop in your email, and we'll help you reset it.</p>
					</v-card-text>

					<v-card-text v-if="showFormError" class="text-signin-error">{{ formErrorMessage }}</v-card-text>

					<v-card-text>
						<!-- form -->
						<v-form v-model="isFormValid" lazy-validation>
							<div class="text-subtitle-1 text-medium-emphasis">Email</div>

							<v-text-field autofocus v-model="forgotPasswordEmail" :rules="formEmailRules" required
								density="compact" placeholder="bruce@batcave.com" prepend-inner-icon="mdi-email-outline"
								variant="outlined" autocomplete="username"></v-text-field>

							<v-btn block :disabled="!isFormValid" :loading="isFormLoading" class="mb-8 mt-3"
								color="blue" size="large" variant="tonal" @click="submit">
								Reset Password
							</v-btn>
						</v-form>

						<v-card-text class="text-center">
							<p>Don't have an account?</p>
							<RouterLink to="/signup" class="text-blue text-decoration-none">Sign up now <v-icon
									icon="mdi-chevron-right"></v-icon></RouterLink>
						</v-card-text>
					</v-card-text>
				</div>

				<div v-if="resetPasswordSent">
					<v-card-text>
						<h4 class="text-h4">Email on the Way! 🚀</h4>
						<p>A password reset link is zooming to your inbox.</p>
					</v-card-text>

					<v-card-text>
						<p style="max-width: 500px;">Just tap that link in our email, and you'll be back in action with
							a shiny new password in no time! 💌🔓</p>
					</v-card-text>
				</div>
			</v-card>
		</v-col>
	</v-row>
</template>


<!-- scripts -->
<script setup lang="js">
import { ref } from 'vue'

import AuthService from '../services/AuthService';

const authService = new AuthService();

let showFormError = ref(false);
let formErrorMessage = ref('');
let isFormValid = ref(false);
let isFormLoading = ref(false);
let forgotPasswordEmail = ref('');
let resetPasswordSent = ref(false);

let rules = {
	required: value => !!value || "Required.",
	min: v => (v && v.length >= 5) || "Min 5 characters"
}

let formEmailRules = [
	v => !!v || "Required",
	v => /.+@.+\..+/.test(v) || "E-mail must be valid"
]


async function submit() {
	try {
		isFormLoading.value = true;
		await authService.handleForgotPassword(forgotPasswordEmail.value);

		// Show reset email sent message
		resetPasswordSent.value = true;
	} catch (error) {
		console.error('Forgot Password failed:', error.message);
		formErrorMessage.value = 'An error occurred while requesting a password reset.';
		showFormError.value = true;
	} finally {
		isFormLoading.value = false;
	}
}
</script>


<!-- styles -->
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