<script setup>
const props = defineProps({
  fixed: {
    type: Boolean,
    required: true
  },
  isEditing: {
    type: Boolean,
    required: true
  },
  entityName: {
    type: String,
    required: true
  },
  iconName: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:fixed', 'save-apprentice']);  // Emite un evento personalizado

function closeModal() {
  emit('update:fixed', false);  // Cierra el modal
}

function guardarAprendiz() {
  emit('save-apprentice');  // Llama al evento para realizar la acción en el componente principal
  closeModal();  // Cierra el modal
}
</script>

<template>
  <q-dialog :model-value="fixed" @update:model-value="val => emit('update:fixed', val)"
            :backdrop-filter="'blur(4px) saturate(150%)'" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card class="modal-card">
      <q-card-section>
        <div class="modal-header">
          <q-icon :name="iconName" size="30px" color="green-9" />
          <div class="modal-title">{{ isEditing ? `Editar ${entityName}` : `Agregar ${entityName}` }}</div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <slot name="modal-content"></slot>  <!-- Aquí se inyectan los campos del formulario -->
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="red" v-close-popup @click="closeModal" icon="cancel" />
        <q-btn flat label="Guardar" color="green-8" @click="guardarAprendiz" icon="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.modal-card {
  width: 80%;
  max-width: 600px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
}

.modal-title {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #2E7D32;
  margin-left: 10px;
}
</style>
