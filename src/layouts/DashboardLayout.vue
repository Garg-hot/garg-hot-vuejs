<script setup lang="ts">
import MenuButton from '../components/MenuButton.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="header">
    <img src="../assets/icon.png" alt="Garg'Hot Logo" class="logo">
  </div>

  <div v-if="route.path === '/dashboard'" class="dashboard-title">
    <img src="../assets/dash.png" alt="Dashboard" class="dashboard-img">
  </div>

  <div v-else class="content-area">
    <router-view></router-view>
  </div>

  <MenuButton />
</template>

<style scoped>
.header {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}

.logo {
  max-width: 150px;
  height: auto;
  margin-left: 20px;
}

.content-area {
  position: fixed;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% - 400px);
}

.dashboard-title {
  position: fixed;
  bottom: -10px;
  left: -90px;
}

.dashboard-img {
  max-width: 800px;
  height: auto;
}
</style>
