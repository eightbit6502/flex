<template>
	<v-layout style="">
		<!-- navigation -->
		<CompNavBar></CompNavBar>


		<v-main class="bg">


			<div class="body-position-fix">


				<!-- content -->
				<div class="content-wrapper">
					<CompAppBar class="app-bar-position"></CompAppBar>

					<!-- heading -->
					<v-row>
						<v-col>
							<h5 class="mt-2 mb-1 welcome_text">User</h5>
							<p class="mb-8 welcome_subtext">Your Dashboard is your snapshot of your portfolio</p>
						</v-col>
					</v-row>


				</div>
			</div>
		</v-main>
	</v-layout>
</template>



<!-- script -->
<script setup lang="js">
import { useAuthStore } from '../stores/authStore';


const authStore = useAuthStore();

</script>



<!-- style -->
<style scoped lang="scss">
.body-position-fix {
	display: flex;
	justify-content: center;
}

.content-wrapper {
	width: 96%;
	max-width: var(--v-max-body-width);
}

.app-bar-position {
	// margin-bottom:20px;
	margin-bottom: var(--v-spacing-appbar-offset);
}

.bans {
	margin-bottom: 10px;
}

.welcome_text {
	font-size: var(--v-font-size-h5);
	// color: rgb(var(--v-font-color-body));
}

.welcome_name {
	font-size: var(--v-font-size-h4);
}

.welcome_subtext {
	font-size: var(--v-font-size-body);
	color: rgba(var(--v-font-color-body), 0.7);
}
</style>
