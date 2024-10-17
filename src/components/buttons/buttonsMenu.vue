<template>
  <q-item clickable v-ripple active-class="linkColor" :to="to" class="item">
    <q-item-section avatar>
      <q-icon :name="icon" class="icon" /> 
    </q-item-section>
    <q-item-section>
      <q-item-label class="drawer-item">{{ titles }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  titles: {
      type: String,
      required: true
  },
  icon: {
      type: String,
      required: true
  },
  to: {
      type: String,
      required: true
  }
});
</script>

<style scoped>
.linkColor {
background-color: rgb(57, 173, 39);
}

.item {
padding: 15px 25px;
margin: 10px 0;
border-radius: 15px;
transition: all 0.3s ease;
background-color: #2E7D32;
color: white;
display: flex;
align-items: center;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item:hover {
background-color: #38803a;
transform: translateY(-5px);
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.drawer-item {
color: white;
font-family: "Calistoga", serif;
font-weight: 600;
font-size: 18px;
font-style: normal;
transition: color 0.3s;
}

.icon {
font-size: 24px;
color: white;
transition: color 0.3s;
}

.item:hover .icon {
color: #c8e6c9;
}

.item:hover .drawer-item {
color: #c8e6c9;
}
</style>