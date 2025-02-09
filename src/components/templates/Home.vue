<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="logo-container">
      <img src="../../assets/Feu.png" alt="Fire" class="fire-img">
      <img src="../../assets/mot.png" alt="Garg'Hot Logo" class="text-img">
    </div>
    <div class="content">
      <div class="actions">
        <router-link to="/login" class="continue-button">Continuer</router-link>
      </div>
    </div>
  </div>
</template>
<!-- HUHU -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.fire-img {
  width: 300px;
  height: auto;
}

.text-img {
  width: 200px;
  height: auto;
}

.continue-button {
  padding: 8px 24px;
  font-size: 16px;
  border: 1px solid #000;
  background-color: white;
  cursor: pointer;
  text-decoration: none;
  color: black;
  transition: background-color 0.3s;
}

.continue-button:hover {
  background-color: #f0f0f0;
}
</style>
