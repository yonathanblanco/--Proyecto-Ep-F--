<template>
    <h2 class="title">{{ title }}</h2>
  </template>
  
  <script>
  export default {
    name: 'Title',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
  </script>
  
  <style scoped>
  .title {
  font-family: Arial, Helvetica, sans-serif; /* Cambia esto a la tipografía que prefieras */
  font-size: 68px; /* Tamaño del texto */
  font-weight:500 ; /* Grosor del texto */
  text-align: center; /* Centrar el texto */
  color: #333; /* Color del texto */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* Sombra del texto */
  margin: 60px 0 0 0; /* Espacio alrededor del título */
}
  </style>
  