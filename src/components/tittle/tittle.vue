<template>
  <div class="title-container">
    <h2 class="title">{{ title }}</h2>
    <div class="vertical-line"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -20px;
}

.title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 58px;
  font-weight: 600;
  text-align: center;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin: 60px 0 0 0;
}

.vertical-line {
  width: 80%;
  /* Grosor de la línea */
  height: 4px;
  /* Altura de la línea */
  background-color: #2e7d32;
 
}
</style>
