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
  font-family: Arial, Helvetica, sans-serif; 
  font-size: 68px; 
  font-weight: 600; 
  text-align: center; 
  color: #333; 
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin: 60px 0 0 0; 
}
  </style>
  