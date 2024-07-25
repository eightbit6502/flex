<!-- markup -->

<template>
	<!-- navigation -->
	<CompNavigation></CompNavigation>
	
	<v-row>

		<!-- ad -->
		<v-col md="8" class="hidden-sm-and-down" style=" background-color: #cecece">

		</v-col>

		<!-- sign up panel -->
		<v-col class="d-flex align-center justify-center" style="background-color: #ffffff">
			<v-card class="mx-auto pa-4" elevation="0" max-width="500" rounded="lg">

				<!-- sign up -->
				<div v-if="!awaitingActivation">
					<v-card-text>
						<h4 class="text-h4">Your Parking Adventure Begins Here!</h4>
						<p>Sign up, gear up, and let's get you parking like a pro! 🚗🌟</p>
					</v-card-text>

					<v-card-text v-if="showFormError" class="text-signup-error">{{ formErrorMessage }}</v-card-text>

					<v-card-text>
						<!-- form -->
						<v-form v-model="isFormValid" lazy-validation>
							<div class="text-subtitle-1 text-medium-emphasis">Name</div>

							<v-row>
								<v-col class="pr-1">
									<v-text-field autofocus v-model="signupFirstName" :rules="[rules.required]" required
										density="compact" placeholder="Firstname" variant="outlined">
									</v-text-field>
								</v-col>
								<v-col class="pl-1">
									<v-text-field v-model="signupLastName" :rules="[rules.required]" required
										density="compact" placeholder="Surname" variant="outlined">
									</v-text-field>
								</v-col>
							</v-row>

							<div class="text-subtitle-1 text-medium-emphasis">Email</div>

							<v-text-field v-model="signupEmail" :rules="signupEmailRules" required density="compact"
								placeholder="bruce@batcave.com" prepend-inner-icon="mdi-email-outline"
								variant="outlined" autocomplete="username">
							</v-text-field>

							<div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
								Password
							</div>

							<v-text-field v-model="signupPassword" :rules="[rules.required, rules.min]" required
								type="password" density="compact"
								placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
								variant="outlined" autocomplete="new-password"></v-text-field>

							<v-text-field v-model="signupPasswordConfirm"
								:rules="[confirmPasswordRules.required, confirmPasswordRules.same]" required
								type="password" density="compact"
								placeholder="Confirm your password" prepend-inner-icon="mdi-lock-outline"
								variant="outlined" autocomplete="new-password"></v-text-field>

							<v-checkbox v-model="signupTerms" color="blue" label="I agree to the Terms & Conditions"
								:rules="[v => !!v || 'You must agree to continue!']" required></v-checkbox>

							<v-btn block :disabled="!isFormValid" :loading="isFormLoading" class="mb-0" color="blue"
								size="large" variant="tonal" @click="submit">
								Create account
							</v-btn>

							<v-card-text class="text-tos text-center ">By clicking "Create Account" you agree to the
								FlexPark Terms of Service and Privacy Policy.</v-card-text>

						</v-form>

						<v-card-text class="text-center">
							<p>Already have an account?</p>
							<RouterLink to="/signin" class="text-blue text-decoration-none">Sign in now <v-icon
									icon="mdi-chevron-right"></v-icon></RouterLink>
						</v-card-text>
					</v-card-text>
				</div>

				<!-- await confirmation -->
				<div v-if="awaitingActivation">
					<CompActivation :formErrorMessage="formErrorMessage" :showFormError="showFormError" :isFormLoading="isFormLoading" @submit="verifyActivationToken"></CompActivation>
				</div>
			</v-card>
		</v-col>
	</v-row>
</template>


<!-- scripts -->

<script setup lang="js">

import { ref } from 'vue'
import router from '../router/index';
import { useAuthStore } from '../stores/useAuthStore';
import AuthService from '../services/AuthService';

const authService = new AuthService();
const authStore = useAuthStore();

let showFormError = ref(false);
let formErrorMessage = ref('');

let isFormValid = ref(false);
let signupEmail = ref('');
let signupFirstName = ref('');
let signupLastName = ref('');
let signupPassword = ref('');
let signupPasswordConfirm = ref('');
let signupTerms = ref(false);
let awaitingActivation = ref(false);
let isFormLoading = ref(false);

let signupEmailRules = [
	v => !!v || "Required",
	v => /.+@.+\..+/.test(v) || "E-mail must be valid"
]
let rules = {
	required: value => !!value || "Required.",
	min: v => (v && v.length >= 5) || "Min 5 characters"
}

let confirmPasswordRules = {
	required: value => !!value || "Required.",
	same: value => value === signupPassword.value || 'The password confirmation does not match.',
}

async function submit() {
    try {
        isFormLoading.value = true;
        const resp = await authService.handleSignUp(signupEmail.value, signupPassword.value, signupFirstName.value, signupLastName.value);
        isFormLoading.value = false;

        if (resp && resp.status == 201) {
			showFormError.value = false;
            awaitingActivation.value = true;
        } else {
            console.error('Error:', resp.message);
            formErrorMessage.value = "Uh oh! This Email is already in use.";
            showFormError.value = true;
            awaitingActivation.value = false;
        }
    } catch (error) {
        console.error('Signup failed:', error.message);
        formErrorMessage.value = 'Uh oh! There was a network error';
        showFormError.value = true;
        awaitingActivation.value = false;
    }
}


async function verifyActivationToken(val) {
	try {
		isFormLoading.value = true;
		const resp = await authService.handleActivation(val);

		if (resp.status == 200) {
			// Successful activation
			authStore.setUserAndToken(resp.user, resp.token);
			router.push({ path: '/search' });
		} else if (resp.status == 404) {
			// Token not found
			formErrorMessage.value = 'Activation code does not match.';
			showFormError.value = true;
		} else if (resp.status == 401) {
			// Token expired
			formErrorMessage.value = 'Activation code has expired. A new activation code has been sent to your email.';
			showFormError.value = true;
		} else {
			// Other errors
			formErrorMessage.value = 'An error occurred during activation.';
			showFormError.value = true;
		}
	} catch (error) {
		console.error('Verification failed:', error.message);
		formErrorMessage.value = 'Uh oh! There has been a network error';
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

.text-signup-error {
	/* font-size: 1.375rem !important; */
	font-weight: 500;
	color: red;
	font-family: Public Sans, sans-serif, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol !important;
}

.text-tos {
	font-size: 0.75rem !important;
	color: #cecece;
	max-width: 400px;
	/* text-align: center; */
	/* margin-top: -30px; */
}
</style>