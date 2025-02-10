<script setup>
</script>

<template>
  <router-view></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  background-image:
    linear-gradient(#e5e5e5 1px, transparent 1px),
    linear-gradient(90deg, #e5e5e5 1px, transparent 1px);
  background-size: 20px 20px;
  font-family: Arial, sans-serif;
  overflow: hidden;
  position: relative;
}

/* Effet de dégradé dynamique en arrière-plan */
@keyframes gradientAnimation {
  0% {
    background: linear-gradient(45deg, rgba(255, 0, 0, 0.3), rgba(0, 255, 255, 0.3));
  }
  25% {
    background: linear-gradient(45deg, rgba(0, 255, 0, 0.3), rgba(255, 255, 0, 0.3));
  }
  50% {
    background: linear-gradient(45deg, rgba(0, 0, 255, 0.3), rgba(255, 0, 255, 0.3));
  }
  75% {
    background: linear-gradient(45deg, rgba(255, 165, 0, 0.3), rgba(0, 255, 0, 0.3));
  }
  100% {
    background: linear-gradient(45deg, rgba(255, 0, 0, 0.3), rgba(0, 255, 255, 0.3));
  }
}

/* Application de l'animation */
body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 0, 0, 0.3), rgba(0, 255, 255, 0.3));
  animation: gradientAnimation 10s ease infinite;
  z-index: -1;
}

/* Animation de petites particules de dégradé flottantes */
@keyframes particleEffect {
  0% {
    transform: translate(-100%, -100%) scale(0.5);
    opacity: 0;
  }
  50% {
    transform: translate(100%, 100%) scale(1);
    opacity: 0.5;
  }
  100% {
    transform: translate(-100%, -100%) scale(0.5);
    opacity: 0;
  }
}

body::after {
  content: "";
  position: absolute;
  top: 20%;
  left: 20%;
  width: 200px;
  height: 200px;
  background: rgba(0, 255, 255, 0.3);
  border-radius: 50%;
  animation: particleEffect 4s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}
</style>
