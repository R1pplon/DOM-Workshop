<template>
  <div id="app">
    <FaultText />
  </div>
</template>

<script setup>
import FaultText from './components/FaultText.vue'
</script>

<style>
* {
  font-size: 2vmin;
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
}
</style>
