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
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}
button{
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 300px;
  position: fixed;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
}

button {
  padding: 12px 20px;
  width: 200px;
  border: 2px solid #000;
  background-color: white;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: black;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f0f0f0;
}
</style>
