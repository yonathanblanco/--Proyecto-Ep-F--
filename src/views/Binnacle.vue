<script setup>
import Table from "../components/tables/tablestatus.vue";
import Title from "../components/tittle/tittle.vue";
import { ref, onMounted } from "vue";
import { getData } from "../services/apiClient.js";

const rows = ref([]);
const alert = ref(false);
const filterType = ref('instructor');
const searchText = ref('');

const columns = ref([
  {
    name: "index",
    label: "N°",
    field: "index",
    align: 'center',
    style: "width: 40px"
  },
  {
    name: "assignment",
    label: "ETAPA PRODUCTIVA ASIGNADA",
    field: "assignment",
    align: 'left'
  },
  {
    name: "fecha",
    label: "N° BITACORA",
    field: "fecha",
    align: 'center'
  },
  {
    name: "bitacora",
    label: "N° BITACORA",
    field: "bitacora",
    align: 'center'
  },
  {
    name: "instructor",
    label: "INSTRUCTOR",
    field: "instructor",
    align: 'left'
  },
  {
    name: "status",
    label: "ESTADO",
    field: "status",
    align: 'center'
  },
  {
    name: "observations",
    label: "OBSERVACIONES",
    field: "observations",
    align: 'center'
  }
]);

// Datos de ejemplo que coinciden exactamente con la imagen
const mockData = ref([
  { index: 1, assignment: "NOMBRE APRENDIZ / APRENDICES", fecha: "00", bitacora: "00", instructor: "NOM. INSTRUCTOR", status: "Pendiente" },
  { index: 2, assignment: "NOMBRE APRENDIZ / APRENDICES", fecha: "00", bitacora: "00", instructor: "NOM. INSTRUCTOR", status: "Ejecutada" },
  { index: 3, assignment: "NOMBRE APRENDIZ / APRENDICES", fecha: "00", bitacora: "00", instructor: "NOM. INSTRUCTOR", status: "Ejecutada" },
  { index: 4, assignment: "NOMBRE APRENDIZ / APRENDICES", fecha: "00", bitacora: "00", instructor: "NOM. INSTRUCTOR", status: "Ejecutada" },
  { index: 5, assignment: "NOMBRE APRENDIZ / APRENDICES", fecha: "00", bitacora: "00", instructor: "NOM. INSTRUCTOR", status: "Ejecutada" },
  { index: 6, assignment: "NOMBRE APRENDIZ / APRENDICES", fecha: "00", bitacora: "00", instructor: "NOM. INSTRUCTOR", status: "Ejecutada" },
  { index: 7, assignment: "NOMBRE APRENDIZ / APRENDICES", fecha: "00", bitacora: "00", instructor: "NOM. INSTRUCTOR", status: "Ejecutada" },
]);

onMounted(() => {
  rows.value = mockData.value;
});

function openDialog(row) {
  alert.value = true;
}
</script>

<template>
  <div class="bitacoras-container">
    <!-- Botón de regreso -->
    <div class="back-button">
      <q-btn flat round color="green" icon="arrow_back" />
    </div>

    <!-- Título y línea verde -->
    <div class="title-section">
      <h1 class="title">Bitácoras</h1>
      <div class="green-underline"></div>
    </div>

    <!-- Sección de filtros -->
    <div class="filter-section">
      <span class="filter-label">Realizar filtro por</span>
      <div class="radio-group">
        <label class="radio-container">
          <input type="radio" v-model="filterType" value="instructor">
          <span class="radio-label">Instructor</span>
        </label>
        <label class="radio-container">
          <input type="radio" v-model="filterType" value="aprendiz">
          <span class="radio-label">Aprendiz</span>
        </label>
      </div>
      <div class="search-container">
        <q-select
          outlined
          v-model="searchText"
          placeholder="Ingrese el nombre o número de documento"
          class="search-input"
        />
      </div>
    </div>

    <!-- Tabla -->
    <div class="table-wrapper">
      <table class="custom-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.name" :style="col.style">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.index">
            <td class="text-center">{{ row.index }}</td>
            <td>{{ row.assignment }}</td>
            <td class="text-center">{{ row.fecha }}</td>
            <td class="text-center">{{ row.bitacora }}</td>
            <td>{{ row.instructor }}</td>
            <td class="text-center">
              <q-select
                v-model="row.status"
                :options="['Pendiente', 'Ejecutada']"
                outlined
                dense
                class="status-select"
                bg-color="grey-2"
              />
            </td>
            <td class="text-center actions-cell">
              <div class="action-buttons">
                <q-btn round color="green" size="sm" icon="search" class="action-button" />
                <q-btn round color="green" size="sm" icon="add" class="action-button" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div class="pagination">
      <span class="pagination-text">1-260 de 260</span>
    </div>
  </div>
</template>

<style scoped>
.bitacoras-container {
  padding: 20px;
  background-color: white;
  min-height: 100vh;
}

.back-button {
  margin-bottom: 20px;
}

.title-section {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #000;
}

.green-underline {
  height: 2px;
  background-color: #4CAF50;
  width: 100%;
  margin: 0 auto;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.filter-label {
  color: #4CAF50;
  font-size: 14px;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.radio-container input[type="radio"] {
  accent-color: #4CAF50;
}

.search-container {
  flex-grow: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
}

.table-wrapper {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.custom-table th {
  background-color: #f5f5f5;
  padding: 12px;
  font-weight: 600;
  color: #333;
  border: 1px solid #ddd;
  text-align: center;
}

.custom-table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  color: #666;
}

.status-select {
  width: 130px;
  margin: 0 auto;
}

.status-select :deep(.q-field__control) {
  background-color: #f5f5f5;
}

.actions-cell {
  padding: 4px !important;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.action-button {
  width: 32px;
  height: 32px;
}

.pagination {
  text-align: right;
  padding: 10px;
  color: #666;
  font-size: 14px;
}

.text-center {
  text-align: center;
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 4px;
  border-color: #ddd;
}

:deep(.q-field--outlined .q-field__control:hover) {
  border-color: #4CAF50;
}

:deep(.q-btn) {
  min-height: 32px;
  padding: 0 12px;
}
</style>