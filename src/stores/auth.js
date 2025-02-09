import { ref } from 'vue';
import { defineStore } from 'pinia';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const loading = ref(true);

  // Initialiser le store avec l'état d'authentification actuel
  onAuthStateChanged(auth, (_user) => {
    user.value = _user;
    isAuthenticated.value = !!_user;
    loading.value = false;
  });

  return {
    user,
    isAuthenticated,
    loading
  };
});
