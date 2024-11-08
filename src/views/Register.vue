<script setup>
import { ref, onBeforeMount } from "vue";
import { format, useQuasar } from "quasar";
import { getData, putData } from "../services/apiClient";
import Table from "../components/tables/tablestatus.vue";
import Title from "../components/tittle/tittle.vue";
import ButtonBack from "../components/buttons/buttonBack.vue";
import { QDialog, QCard, QCardSection, QBtn, QInput } from 'quasar';

const fixed = ref(false);
const isEditing = ref(false);
const $q = useQuasar();
const showModal = ref(false);

onBeforeMount(() => {
  getApprentices();
});

const columns = ref([
  {
    name: "index",
    align: "center",
    label: "N°",
    field: "index",
    format: (val) => val,
    style: "width: 5%; text-align: center;",
  },
  {
    name: "apprentice",
    align: "center",
    label: "NOMBRE APRENDIZ / APRENDICES",
    field: row => `${row.firstname} ${row.lastname}`,
  },
  {
    name: "program",
    align: "center",
    label: "PROGRAMA",
    field: (row) => row.fiche?.name || "",
  },
  {
    name: "modality",
    align: "center",
    label: "MODALIDAD",
    field: (row) => row.modality?.name || "MODALIDAD",
  },
  {
    name: "assignment",
    align: "center",
    label: "ASIGNACIÓN",
    field: (row) => "<icono_buscar>", // Aquí va el ícono de búsqueda.
    format: () => `<q-icon name="search" color="green" />`, // Renderiza el ícono de búsqueda.
  },
  {
    name: "startDate",
    align: "center",
    label: "FECHA INICIO",
    field: "startDate",
    format: (val) => val ? new Date(val).toLocaleDateString() : "00/00/00",
  },
  {
    name: "endDate",
    align: "center",
    label: "FECHA FIN",
    field: "endDate",
    format: (val) => val ? new Date(val).toLocaleDateString() : "00/00/00",
  },
  {
    name: "details",
    align: "center",
    label: "DETALLES",
    field: "details",
    format: () => `<q-icon name="visibility" color="green" />`, // Ícono de detalles.
  },
  {
    name: "hours",
    align: "center",
    label: "REGISTRO HORAS",
    field: "hours",
    format: () => `<q-icon name="visibility" color="green" />`, // Ícono de horas.
  },
  {
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "status",
    format: (val) => val === 1 
      ? '<q-badge color="green" label="Activo" />' 
      : '<q-badge color="red" label="Inactivo" />',
  },
  {
    name: "opciones",
    align: "center",
    label: "OPCIONES",
    field: "opciones",
    format: () => `
      <q-icon name="edit" color="green" /> 
      <q-icon name="check" color="red" />`,
  },
]);


const rows = ref([]);

async function getApprentices() {
  const storedAuth = localStorage.getItem("auth");
  const token = storedAuth ? JSON.parse(storedAuth) : null;
  console.log(token.token);
  const res = await getData("apprentice/listallapprentice");
  rows.value = res;
  console.log(res);
  rows.value = res.map((item, index) => ({
    ...item,
    index: index + 1
  }));
}

function openAddModal() {
  showModal.value = true;
}

function closeAddModal() {
  showModal.value = false;
}

function edit(row) {
  fixed.value = true;
  isEditing.value = true;
}

async function activate(id) {
  const res = await putData("apprentice/enableapprentice/${id}");
  console.log(res);
  await getApprentices();
}

async function deactivate(id) {
  const res = await putData("apprentice/disableapprentice/${id}");
  console.log(res);
  await getApprentices();
}

const modalidades = [
  'PASANTÍA',
  'VINCULO LABORAL',
  'UNIDAD PRODUCTIVA FAMILIAR',
  'CONTRATO DE APRENDIZAJE',
  'PROYECTO EMPRESARIAL',
  'PROYECTO PRODUCTIVO',
  'PROYECTO PRODUCTIVO I+D',
  'PROYECTO SOCIAL',
  'MONITORIAS'
];

</script>

<template>
  <div class="q-gutter-md divMain">
    <div>
      <ButtonBack />
      <Title title="REGISTROS EP" />
      <!-- Botón CREAR -->
      <div class="divAgregar">
        <q-btn @click="openAddModal" class="add-aprendiz-btn" icon="add_circle" label="CREAR"></q-btn>
      </div>
    </div>

    <!-- Tabla -->
    <div>
      <Table
        :rows="rows"
        :columns="columns"
        :openEditModal="edit"
        :activate="activate"
        :deactivate="deactivate"
      />
    </div>

    <!-- Modal -->
    <q-dialog v-model="showModal" persistent>
  <q-card>
    <!-- Sección de encabezado con fondo verde oscuro y texto blanco -->
    <q-card-section class="text-h6 text-center" style="background-color: #2E7D32; color: white;">
      SELECCIONE MODALIDAD
    </q-card-section>

    <!-- Sección de entrada de texto -->
    <q-card-section>
      <q-select
        filled
        label="Nombre de la modalidad"
        :options="modalidades"
        class="q-mt-md"
      />
    </q-card-section>

    <!-- Sección de botones alineados al centro -->
    <q-card-section align="center">
      <q-btn label="Guardar" icon="save" @click="closeAddModal" style="background-color: #2E7D32; color: white;"/>
      <q-btn label="Cerrar" color="grey" outline icon="close" @click="closeAddModal" class="q-ml-sm" />
    </q-card-section>
  </q-card>
</q-dialog>

  </div>
</template>
 
<style scoped>
/* Estilos del botón CREAR */
.add-aprendiz-btn {
    background-color: #2E7D32;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px;
    padding: 10px 15px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 9px rgba(138, 138, 138, 0.308);
    margin-bottom: 15px;
}

.divAgregar {
    margin-top: 28px;
    display: flex;
    margin-left: 190px;
}

/* Estilos del modal */
.text-h6 {
    font-size: 18px;
    font-weight: bold;
    
}

.q-card {
    max-width: 400px;
    padding: 16px;
}

.q-mt-md {
    margin-top: 1em;
}


</style>