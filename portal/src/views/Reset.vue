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

				<!-- reset password -->
				<div v-if="!resetPasswordComplete">
					<v-card-text>
						<h4 class="text-h4">Create Your New Password</h4>
						<p>Choose a strong, new password and enter it twice to confirm</p>
					</v-card-text>

					<v-card-text v-if="showFormError" class="text-signin-error">{{ formErrorMessage }}</v-card-text>

					<v-card-text>
						<!-- form -->
						<v-form v-model="isFormValid" lazy-validation>
							<div class="text-subtitle-1 text-medium-emphasis">New Password</div>

							<v-text-field autofocus :disabled="lockForm" v-model="resetPassword"
								:rules="[rules.required, rules.min]" required type="password" density="compact"
								placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
								variant="outlined" autocomplete="new-password"></v-text-field>

							<v-text-field :disabled="lockForm" v-model="resetPasswordConfirm"
								:rules="[confirmPasswordRules.required, confirmPasswordRules.same]" required
								type="password" density="compact" placeholder="Confirm your password"
								prepend-inner-icon="mdi-lock-outline" variant="outlined"
								autocomplete="new-password"></v-text-field>

							<v-btn block :disabled="!isFormValid" :loading="isFormLoading" class="mb-8" color="blue"
								size="large" variant="tonal" @click="submit">
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

				<!-- reset complete -->
				<div v-if="resetPasswordComplete">
					<v-card-text>
						<h4 class="text-h4">Password Updated! 🎉</h4>
						<p>Your password has been changed and is now as fresh as new.</p>
					</v-card-text>

					<v-card-text>
						<p style="max-width: 500px;">You're all set with your new password. Now you can dive back into
							the world of hassle-free parking with FlexPark. <br><br>Remember, keeping your password
							unique and complex is key to keeping your account secure. <br><br>Happy parking! 🚗💨</p>
					</v-card-text>

					<v-card-text class="text-center">
						<p>Please sign in with your new password</p>
						<RouterLink to="/signin" class="text-blue text-decoration-none">Sign in now <v-icon
								icon="mdi-chevron-right"></v-icon></RouterLink>
					</v-card-text>
				</div>
			</v-card>
		</v-col>
	</v-row>
</template>


<!-- scripts -->

<script setup lang="js">
import { ref } from 'vue'
import { useRoute } from 'vue-router';

import AuthService from '../services/authService';

const authService = new AuthService();

const route = useRoute();
const token = route.params.token;

let showFormError = ref(false);
let formErrorMessage = ref('');
let lockForm = ref(false);

let isFormValid = ref(false);
let isFormLoading = ref(false);
let resetPassword = ref('');
let resetPasswordConfirm = ref('');
let resetPasswordComplete = ref(false);

let rules = {
	required: value => !!value || "Required.",
	min: v => (v && v.length >= 5) || "Min 5 characters"
}

let confirmPasswordRules = {
	required: value => !!value || "Required.",
	same: value => value === resetPassword.value || 'The password confirmation does not match.',
}

async function submit() {
	try {
		showFormError.value = false;
		isFormLoading.value = true;
		const resp = await authService.handleResetPassword(token, resetPassword.value);

		if (resp.status == 400) {
			showFormError.value = true;
			formErrorMessage.value = "It looks like you are trying to reset a password with no matching tokens. This has been logged for security reasons and repeated attempts will result in a timeout."

			resetPassword.value = "";
			resetPasswordConfirm.value = "";
			lockForm.value = true;
		} else if (resp.status == 401) {
			showFormError.value = true;
			formErrorMessage.value = "It looks like you took longer than 15 minutes to enter your password reset code. We'll lock this form and send you a new code for security reasons."

			resetPassword.value = "";
			resetPasswordConfirm.value = "";
			lockForm.value = true;
		} else if (resp.status == 200) {
			// display a message indicating that reset is complete and direct to login
			resetPasswordComplete.value = true;
		}

	} catch (error) {
		console.error('Password reset failed:', error.message);
		formErrorMessage.value = 'There was an error processing your request';
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
