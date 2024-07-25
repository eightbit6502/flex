<template>
    <v-navigation-drawer class="" v-model="showNavigationDrawer" location="right" :width="300">
        <v-list-item class="ma-0 pa-0 pr-5" :ripple="false" append-icon="mdi-close"
            @click="showNavigationDrawer = !showNavigationDrawer"></v-list-item>

        <div v-if="authStore.user">
            <v-list-item class="" lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
                subtitle="Logged in" :title="authStore.user.first_name+' '+authStore.user.last_name"></v-list-item>
        
                <v-divider></v-divider>
        
            </div>

        

        <v-list nav>
            <v-list-item prepend-icon="mdi-view-dashboard">
                <RouterLink class="nav-link" to="/">Home</RouterLink>
            </v-list-item>

            <v-list-item prepend-icon="mdi-car-search">
                <RouterLink class="nav-link" to="/search">Search</RouterLink>
            </v-list-item>

            <v-list-item prepend-icon="mdi-account">
                <RouterLink class="nav-link" to="/signin">Sign in</RouterLink>
            </v-list-item>

            <v-list-item prepend-icon="mdi-account">
                <RouterLink class="nav-link" to="/signup">Sign Up</RouterLink>
            </v-list-item>

            <v-list-item prepend-icon="mdi-account">
                <RouterLink class="nav-link" to="/forgot">Forgot Password</RouterLink>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar :elevation="0">
        <v-app-bar-title class="font-heading" style="font-weight: 700;">FlexPark</v-app-bar-title>

        <template v-slot:append>
            <v-app-bar-nav-icon @click="showNavigationDrawer = !showNavigationDrawer"></v-app-bar-nav-icon>
        </template>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>


    </v-app-bar>
</template>

<!-- scripts -->
<script setup lang="js">
import { ref } from 'vue'
import AuthService from '../services/AuthService';
import { useAuthStore } from '../stores/useAuthStore';

const authService = new AuthService();
const authStore = useAuthStore();

let showNavigationDrawer = ref(false);

</script>


<!-- styles -->
<style scoped>
.nav-link {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: "1rem";
    color: rgba(1, 1, 1, 0.87);
    text-decoration: none;
}
</style>