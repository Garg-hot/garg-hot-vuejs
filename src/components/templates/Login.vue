<template>
  <div class="login-container">
    <div class="left-side">
      <img src="../../assets/conn.png" alt="Garg'hot" />
    </div>
    <div class="right-side">
      <h1 class="title">Connexion</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <input 
          type="text" 
          v-model="username" 
          placeholder="Nom d'utilisateur"
          class="form-input"
        />
        <input 
          type="password" 
          v-model="password" 
          placeholder="Mot de passe"
          class="form-input"
        />
        <button type="submit" class="submit-button">Valider</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    // Vérifier d'abord si l'utilisateur n'est pas déjà connecté
    const response = await fetch('/api/auth/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username.value
      })
    });

    const sessionCheck = await response.json();
    if (!response.ok) {
      throw new Error(sessionCheck.message || 'Session check failed');
    }

    // Si la vérification de session est OK, procéder à la connexion Firebase
    const userCredential = await signInWithEmailAndPassword(auth, username.value, password.value)
    if (userCredential.user) {
      router.push('/dashboard')
    }
  } catch (e: any) {
    if (e.code === 'auth/invalid-credential') {
      error.value = 'Email ou mot de passe incorrect'
    } else if (e.message) {
      error.value = e.message
    } else {
      error.value = 'Une erreur est survenue lors de la connexion'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-side {
  margin-left: -200px;
}

.left-side img {
  width: 800px;
  height: auto;
}

.right-side {
  width: 300px;
  margin-right: 400px;
}

.title {
  font-family: 'Press Start 2P', cursive;
  font-size: 24px;
  margin-bottom: 2rem;
  color: black;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid black;
  font-size: 16px;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background: #333;
}
</style>
