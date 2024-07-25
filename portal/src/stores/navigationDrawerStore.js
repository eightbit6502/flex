import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNavigationDrawerStore = defineStore('navigationDrawer', () => {
  const showNavigationDrawer = ref(true);

  function toggleNavigationDrawer() {
    showNavigationDrawer.value = !showNavigationDrawer.value;
  }

  return {
    showNavigationDrawer,
    toggleNavigationDrawer
  };
});
