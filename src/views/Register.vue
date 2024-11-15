<script setup>
import { format } from 'date-fns';
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { getData, putData } from "../services/apiClient";
import Table from "../components/tables/TableRegister.vue";
import Title from "../components/tittle/tittle.vue";
import ButtonBack from "../components/buttons/buttonBack.vue";
import { QDialog, QCard, QCardSection, QBtn, QInput, QSelect, QRadio } from 'quasar';

const fixed = ref(false);
const isEditing = ref(false);
const $q = useQuasar();
const showModal = ref(false);
const searchText = ref('');
const searchType = ref('apprentice');

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
    label: "NOMBRE APRENDIZ",
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
  name: "startDate",
  align: "center",
  label: "FECHA INICIO",
  field: "formattedStartDate", // Cambia a 'formattedStartDate' en lugar de 'startDate'
},

  {
    name: "endDate",
    align: "center",
    label: "FECHA FIN",
    field: "endDate",
    format: (val) => val ? new Date(val).toLocaleDateString() : "00/00/00",
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
    field: "opciones"
  }

]);

const rows = ref([]);
const selectedModality = ref(null);

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

async function getApprentices() {
  try {
    const res = await getData("apprentice/listallapprentice");

    rows.value = res.map((item, index) => {
      // Verificar startDate antes de formatear
console.log("Respuesta del backend:", res); // Verificar si `startDate` está presente en cada objeto


      // Intentar crear una fecha formateada
      let formattedStartDate = "Fecha inválida";
      if (item.startDate) {
        try {
          const date = new Date(item.startDate); // Crear fecha a partir de la cadena
          if (!isNaN(date.getTime())) { // Verificar si es una fecha válida
            formattedStartDate = format(date, "dd/MM/yyyy");
          } else {
            console.error("Fecha inválida en startDate:", item.startDate);
          }
        } catch (e) {
          console.error("Error formateando la fecha:", e);
        }
      }

      return {
        ...item,
        index: index + 1,
        modalityName: item.modality?.name || "N/A",
        formattedStartDate,
      };
    });

  } catch (error) {
    console.error("Error fetching apprentices:", error); 
    $q.notify({
      type: "negative",
      message: `Error al cargar los aprendices: ${error.message}`,
    });
  }
}


function openAddModal() {
  selectedModality.value = null;
  showModal.value = true;
}

function closeAddModal() {
  showModal.value = false;
  selectedModality.value = null;
}

async function saveModality() {
  if (!selectedModality.value) {
    $q.notify({
      type: 'warning',
      message: 'Por favor seleccione una modalidad'
    });
    return;
  }

  try {
    // Aquí deberías hacer la llamada a tu API para guardar la modalidad
    await putData('apprentice/savemodality', {
      modality: selectedModality.value
    });

    $q.notify({
      type: 'positive',
      message: 'Modalidad guardada correctamente'
    });

    closeAddModal();
    await getApprentices();
  } catch (error) {
    console.error('Error saving modality:', error);
    $q.notify({
      type: 'negative',
      message: 'Error al guardar la modalidad'
    });
  }
}

async function activate(id) {
  try {
    await putData(`apprentice/enableapprentice/${id}`);
    await getApprentices();
    $q.notify({
      type: 'positive',
      message: 'Aprendiz activado correctamente'
    });
  } catch (error) {
    console.error('Error activating apprentice:', error);
    $q.notify({
      type: 'negative',
      message: 'Error al activar el aprendiz'
    });
  }
}

async function deactivate(id) {
  try {
    await putData(`apprentice/disableapprentice/${id}`);
    await getApprentices();
    $q.notify({
      type: 'positive',
      message: 'Aprendiz desactivado correctamente'
    });
  } catch (error) {
    console.error('Error deactivating apprentice:', error);
    $q.notify({
      type: 'negative',
      message: 'Error al desactivar el aprendiz'
    });
  }
}

function edit(row) {
  fixed.value = true;
  isEditing.value = true;
  // Aquí puedes agregar la lógica para editar el aprendiz
}
</script>

<template>
  <div class="q-gutter-md divMain">
      <ButtonBack />
      <Title title="REGISTROS EP" />
    <!-- Filtros y búsqueda -->
    <div class="row items-center justify-between q-mb-md">
      <div class="divAgregar">
        <q-btn @click="openAddModal" class="add-aprendiz-btn" icon="add_circle" label="CREAR" />
      </div>

      <div class="row items-center q-gutter-md filter-container">
        <div class="text-subtitle2 filter-label">Realizar filtro por:</div>

        <!-- Radio buttons -->
        <q-radio v-model="searchType" val="file" label="Ficha" color="green-10" class="filter-radio"
          label-color="#2E7D32" />
        <q-radio v-model="searchType" val="apprentice" label="Aprendiz" color="green-10" class="filter-radio"
          label-color="#2E7D32" />

        <!-- Input field -->
        <q-input v-model="searchText" outlined dense placeholder="Ingrese el nombre o número de documento"
          class="filter-input q-ml-sm" style="width: 300px; color: #2E7D32; --q-color-focus: #2E7D32;" />
      </div>
    </div>

    <!-- Tabla -->
    <div>
      <Table :rows="rows" :columns="columns" :openEditModal="edit" :activate="activate" :deactivate="deactivate" />
    </div>

    <!-- Modal -->
    <q-dialog v-model="showModal" persistent> 
      <q-card style="min-width: 350px">
        <q-card-section class="text-h6 text-center" style="background-color: #2E7D32; color: white;">
          SELECCIONE MODALIDAD
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-select v-model="selectedModality" :options="modalidades" filled label="Nombre de la modalidad"
            class="q-mt-md" />
        </q-card-section>

        <q-card-section align="center" class="q-gutter-sm">
          <q-btn label="Guardar" icon="save" color="green" @click="saveModality" />
          <q-btn label="Cerrar" icon="close" color="grey" outline @click="closeAddModal" class="q-ml-sm" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>

.divMain {
  padding: 0 1.5%;
  margin-top: 20px;
}

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

.filter-container{
  margin-right: 190px
}

.search-container {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.filter-label {
  font-weight: bold;
  color: #2E7D32;
}

.filter-radio {
  color: #2E7D32 !important; /* Importante para asegurar el estilo */
}

.filter-input .q-field__control {
  color: #2E7D32 !important;
}

.filter-input .q-field__control .q-field__focus-ring {
  border-color: #2E7D32 !important;
}
</style>