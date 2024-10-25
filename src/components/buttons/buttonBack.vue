<template>
    <q-btn @click="goHome" icon="arrow_back" :style="buttonStyle" round />
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goHome = () => {
    router.push('/home');
  };
  
  const buttonStyle = {
    backgroundColor: '#2E7D32',
    color: 'white' // Para asegurarte de que el ícono se vea bien
  };
  </script>
  