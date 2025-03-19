<template>
  <div class="container" @click="fault">
    <p 
      v-for="(_, index) in 3" 
      :key="index"
      class="faulttext"
      :class="{ 'faulttext_fault': isFaulting }"
      :style="textStyles[index]"
    >CONTEXT</p>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

const player = ref(null)
const isFaulting = ref(false)
const textStyles = ref(Array(3).fill({
  transform: '',
  clipPath: ''
}))

const generateClipPath = () => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const h = Math.random() * 50 + 50
  const w = Math.random() * 40 + 10
  return `polygon(${x}% ${y}%, ${x + w}% ${y}%, ${x + w}% ${y + h}%, ${x}% ${y + h}%)`
}

const fault = () => {
  clearInterval(player.value)
  isFaulting.value = true
  
  setTimeout(() => {
    clearInterval(player.value)
    isFaulting.value = false
    textStyles.value = Array(3).fill({
      transform: '',
      clipPath: ''
    })
  }, 500)

  player.value = setInterval(() => {
    textStyles.value = Array(3).fill().map(() => ({
      transform: `translate(${Math.random() * 60 - 30}%, ${Math.random() * 60 - 30}%)`,
      clipPath: generateClipPath()
    }))
  }, 30)
}

onBeforeUnmount(() => {
  clearInterval(player.value)
})
</script>

<style scoped>
.container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.faulttext {
  position: absolute;
  font-family: Impact, sans-serif;
  color: #FFF;
  font-size: 5rem;
  letter-spacing: 0.5rem;
  user-select: none;
}

.faulttext_fault::after,
.faulttext_fault::before {
  content: "CONTEXT";
  position: absolute;
  left: 0;
  top: 0;
  mix-blend-mode: screen;
}
.faulttext_fault::after {
  color: #ff0000;
  transform: translateX(2%);
}
.faulttext_fault::before {
  color: #0000ff;
  transform: translateX(-2%);
}
</style>
