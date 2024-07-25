<!-- markup -->

<template>
	 <!-- navigation -->
	 <CompNavigation></CompNavigation>
	 
	<v-row>

		<!-- ad -->
		<v-col md="8" class="hidden-sm-and-down" style=" background-color: #cecece">

		</v-col>

		<!-- sign in panel -->
		<v-col class="d-flex align-center justify-center" style="background-color: #ffffff">
			<div v-if="!awaitingActivation">
				<v-card class="mx-auto pa-4" elevation="0" max-width="800" rounded="lg">
					<v-card-text>
						<h4 class="text-h4">Welcome to FlexPark!</h4>
						<p>Please sign-in to your account and start the adventure</p>
					</v-card-text>

					<v-card-text v-if="showFormError" class="text-signin-error">{{ formErrorMessage }}</v-card-text>

					<v-card-text>
						<!-- form -->
						<v-form v-model="isFormValid" lazy-validation>
							<div class="text-subtitle-1 text-medium-emphasis">Email</div>

							<v-text-field autofocus v-model="signinEmail" :rules="signinEmailRules" required density="compact"
								placeholder="bruce@batcave.com" prepend-inner-icon="mdi-email-outline"
								variant="outlined" autocomplete="username">
							</v-text-field>

							<div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
								Password
							</div>

							<v-text-field v-model="signinPassword" :rules="[rules.required, rules.min]" required
								type="password" density="compact"
								placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
								variant="outlined" autocomplete="current-password"></v-text-field>

							<v-card-text class="text-end mt-n7 mb-3">
								<RouterLink to="/forgot" class="text-blue text-decoration-none">Forgot Password?</RouterLink>
							</v-card-text>

							<v-btn block :disabled="!isFormValid" :loading="isFormLoading" class="mb-8" color="blue"
								size="large" variant="tonal" @click="submit">
								Sign In
							</v-btn>
						</v-form>

						<v-card-text class="text-center">
							<p>Don't have an account?</p>
							<RouterLink to="/signup" class="text-blue text-decoration-none">Sign up now <v-icon
									icon="mdi-chevron-right"></v-icon></RouterLink>
						</v-card-text>
					</v-card-text>
				</v-card>
			</div>

			<!-- await confirmation -->
			<div v-if="awaitingActivation">
				<CompActivation :formErrorMessage="formErrorMessage" :showFormError="showFormError"
					:isFormLoading="isFormLoading" @submit="verifyActivationToken"></CompActivation>
			</div>
		</v-col>
	</v-row>
</template>


<!-- scripts -->

<script setup lang="js">

import { ref } from 'vue'
import router from '../router/index'
import { useAuthStore } from '../stores/useAuthStore';
import AuthService from '../services/AuthService';

const authService = new AuthService();
const authStore = useAuthStore();

let showFormError = ref(false);
let formErrorMessage = ref('');

let isFormValid = ref(false);
let isFormLoading = ref(false);
let signinEmail = ref('');
let signinPassword = ref('');
let awaitingActivation = ref(false);

let signinEmailRules = [
	v => !!v || "Required",
	v => /.+@.+\..+/.test(v) || "E-mail must be valid"
]
let rules = {
	required: value => !!value || "Required.",
	min: v => (v && v.length >= 5) || "Min 5 characters"
}

async function submit() {
    try {
        isFormLoading.value = true;
        const resp = await authService.handleSignIn(signinEmail.value, signinPassword.value);

        if (resp.status == 200) {
            authStore.setUserAndToken(resp.user, resp.token);
            router.push({ path: '/search' });

        } else if (resp.status == 403 && (resp.message == "Account is not active" || resp.message == "Activation code has expired")) {
            awaitingActivation.value = true;
            showFormError.value = false;

        } else {
            formErrorMessage.value = resp.message || 'Login error occurred';
            showFormError.value = true;

        }
    } catch (error) {
        console.error('Signin failed:', error.message);
        formErrorMessage.value = 'Network error';
        showFormError.value = true;
		
    } finally {
        isFormLoading.value = false;
        if (!awaitingActivation.value) {
            awaitingActivation.value = false;
        }
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

.text-signin-error {
	/* font-size: 1.375rem !important; */
	font-weight: 500;
	color: red;
	font-family: Public Sans, sans-serif, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol !important;
}
</style>