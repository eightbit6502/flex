<!-- markup -->

<template>
	<v-row>
		
		<!-- ad -->
		<v-col md="8" class="hidden-sm-and-down bg">
			
		</v-col>
		
		<!-- sign in panel -->
		<v-col class="d-flex position-relative justify-center align-center panel">
			<div v-if="!awaitingActivation" style="width:80%">
				<v-card-text>
					<h4>Welcome to FlexPark</h4>
					<p>Please sign-in to your account</p>
				</v-card-text>
				
				<v-card-text v-if="showFormError" class="text-signin-error">{{ formErrorMessage }}</v-card-text>
				
				<v-card-text>
					<!-- form -->
					<v-form v-model="isFormValid" lazy-validation>
						<div class="text-subtitle-1 text-medium-emphasis">Email</div>
						
						<v-text-field autofocus v-model="signinEmail" :rules="signinEmailRules" required density="compact"
						placeholder="email" variant="outlined" autocomplete="username">
					</v-text-field>
					
					<div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
						Password
					</div>
					
					<v-text-field v-model="signinPassword" :rules="[rules.required, rules.min]" required
					type="password" density="compact" placeholder="Enter your password" 
					variant="outlined" autocomplete="current-password"></v-text-field>
					
					<v-card-text class="text-end mt-n7 mb-3">
						<RouterLink to="/forgot" class="text-decoration-none">Forgot Password?</RouterLink>
					</v-card-text>
					
					<v-btn block :disabled="!isFormValid" :loading="isFormLoading" class="mb-8"
					size="large" @click="submit">
					Sign In
				</v-btn>
			</v-form>
		</v-card-text>
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
import { useAuthStore } from '../stores/authStore';
import AuthService from '../services/authService';

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
			console.log(resp.user);
			router.push({ path: '/' });
			
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
			router.push({ path: '/' });
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

<style scoped lang="scss">
@import '../styles/variables.scss';

.text-signin-error {
	font-weight: 500;
	color: $error-color;
}

.panel {
	background-color: $surface-color;
}

.bg {
	background-color: $background-color;
}


</style>