<template>
  <div class="table-container">
    <q-table :rows="rows" :columns="columns" flat bordered class="styled-table" style="width: 80%">
      <!-- Slot para la columna 'opciones' con botón de acciones tipo FAB -->
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <q-fab v-model="fab" color="#2E7D32" icon="keyboard_arrow_left" direction="left" class="fab-button">

            <!-- Acción de editar -->
            <q-fab-action class="fab-action-green" @click="onClickEdit(props.row)" icon="edit" label="Editar" />

            <!-- Acción de activar -->
            <q-fab-action class="fab-action-green" @click="activate(props.row._id)" v-if="props.row.status === 0"
              icon="check" label="Activar" />

            <!-- Acción de desactivar -->
            <q-fab-action class="fab-action-green" @click="deactivate(props.row._id)" v-else icon="close"
              label="Desactivar" />

            <!-- Acción de detalles -->
            <q-fab-action class="fab-action-green" @click="showDetails(props.row)" icon="visibility" label="Detalles" />

            <!-- Acción de asignación -->
            <q-fab-action class="fab-action-green" @click="assign(props.row)" icon="assignment" label="Asignación" />

            <!-- Acción de registro de horas -->
            <q-fab-action class="fab-action-green" @click="logHours(props.row)" icon="access_time"
              label="Registro de Horas" />
          </q-fab>
        </q-td>
      </template>

      <!-- Slot para la columna 'estado' -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <p :style="{ color: props.row.status === 1 ? 'green' : 'red' }">
            {{ props.row.status === 1 ? 'Activo' : 'Inactivo' }}
          </p>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fab = ref(false); // Controla el estado de la FAB

const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  onClickEdit: {
    type: Function,
    required: true
  },
  activate: {
    type: Function,
    required: true
  },
  deactivate: {
    type: Function,
    required: true
  },
  showDetails: {
    type: Function,
    required: true
  },
  assign: {
    type: Function,
    required: true
  },
  logHours: {
    type: Function,
    required: true
  }
});
</script>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}

.styled-table {
  font-family: 'Arial', sans-serif;
  font-size: 40px;
  color: #333;
  border-collapse: collapse;
  font-weight: bold;
  overflow: hidden;
}

.q-td {
  padding: 12px 8px;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
}

.fab-button {
  display: flex;
  justify-content: center;
  background-color: #2E7D32 !important;
  color: #fff !important;
}

.fab-action-green {
  background-color: #2E7D32 !important;
  color: #fff !important;
}
</style>
