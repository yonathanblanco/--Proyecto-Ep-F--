<template>
    <div>
      <q-item clickable v-ripple @click="openModal" class="item">
        <q-item-section avatar>
          <q-icon :name="icon" class="icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="drawer-item">{{ titles }}</q-item-label>
        </q-item-section>
      </q-item>
  
      <q-dialog v-model="dialog" persistent>
        <q-card>
          <q-card-section>
            <h2 class="modal-title">{{ modalTitle }}</h2>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Cerrar" @click="closeModal" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    titles: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  });
  
  const dialog = ref(false);
  const modalTitle = ref('');
  
  const openModal = () => {
    modalTitle.value = props.titles; // Usar el título del botón
    dialog.value = true;
  };
  
  const closeModal = () => {
    dialog.value = false;
  };
  </script>
  
  <style scoped>
  .item {
    padding: 13px 10px;
    margin: 1px 0;
    border-radius: 15px;
    background-color: #2E7D32;
    color: white;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 180px;
  }
  .drawer-item {
    color: white;
    font-weight: 700;
    font-size: 16px;
  }
  .icon {
    font-size: 24px;
    color: white;
  }
  .modal-title {
    font-size: 24px;
    text-align: center;
  }
  </style>
  