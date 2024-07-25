// src/store/useAuthStore.js

import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth', // Unique identifier for the store
  state: () => ({
    user: null, // Initialize state from local storage (if available)
    token: null, // Initialize token (JWT) from local storage (if available)
  }),
  actions: {
    // Set user data and token after successful login
    setUserAndToken(user, token) {
      this.user = user;
      this.token = token;

      // Store the token in an HttpOnly cookie (server-side)
      // Example: response.set_cookie('token', token, httponly=True);
    },
    // Clear user data and token on logout
    clearUserAndToken() {
      this.user = null;
      this.token = null;

      // Remove the token from the HttpOnly cookie (server-side)
      // Example: response.delete_cookie('token');
    },
  },
});
