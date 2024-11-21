<script setup>
import { ref, onBeforeMount,computed } from "vue";
import { useQuasar } from "quasar";
import { getRepforaData } from "@/services/apiRepfora";
import { getData } from "@/services/apiClient";
import Title from "@/components/tittle/tittle.vue";
import ButtonBack from '@/components/buttons/buttonBack.vue';
import filterSelect from "@/components/selectfilter/filterSelect.vue";

const fixed = ref(false);
const $q = useQuasar();

// Nuevas variables para los filtros
const group = ref(null);
const selectedFilter = ref(null);





onBeforeMount(() => {
  getFollowups();
});

const columns = ref([
  {
    name: "index",
    align: "center",
    label: "N°",
    field: "index",
    sortable: false,
    style: "width: 5%; text-align: center;",
  },
  {
    name: "apprentice",
    align: "left",
    label: "ETAPA PRODUCTIVA ASIGNADA",
    field: "apprentice",
    sortable: true,
    style: "width: 20%;",
  },
  {
    name: "date",
    align: "center",
    label: "FECHA",
    field: "date",
    sortable: true,
    style: "width: 10%; text-align: center;",
  },
  {
    name: "number",
    align: "center",
    label: "N° BITÁCORA",
    field: "number",
    sortable: true,
    style: "width: 10%; text-align: center;",
  },
  {
    name: "instructor",
    align: "center",
    label: "INSTRUCTOR",
    field: "instructor",
    sortable: true,
    style: "width: 15%; text-align: center;",
  },
  {
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "status",
    sortable: true,
    style: "width: 10%; text-align: center;",
  },
  {
    name: "actions",
    align: "center",
    label: "OBSERVACIONES",
    style: "width: 10%; text-align: center;",
  },
]);

const rows = ref([
{
    apprentice: "Juan Perez",
    instructor: "Pedro Rodriguez",
    number: "1",
}

]);


const searchTerm = ref('');

// Obtener instructores
async function getInstructors() {
  const res = await getRepforaData("instructors");
  if (Array.isArray(res)) {
    return res.map((instructor) => ({
      label: `${instructor.name} - ${instructor.numdocument}`,
      value: instructor._id,
    }));
  } else {
    console.error("La respuesta de la API no es un array");
    return [];
  }
}

// Obtener aprendices
async function getApprentices() {
  const res = await getData("apprentice/listallapprentice");
  if (Array.isArray(res)) {
    return res.map((apprentice) => ({
      label: `${apprentice.firstName} ${apprentice.lastName} - ${apprentice.numDocument}`,
      value: apprentice._id,
      estado: apprentice.status,
    }));
  } else {
    console.error("La respuesta de la API no es un array");
    return [];
  }
}

async function getFollowups() {
  const res = await getData("followup/listallfollowup");
 rows.value = res;
 console.log(res);
};

function viewDetails(rowId) {
  console.log("Viewing details for row:", rowId);
}

function handleSearch() {
  // Implementar lógica de búsqueda basada en filterType y searchText
  console.log('Buscando:', filterType.value, searchText.value);
}

const filter = async () => {
  try {
    rows.value = [];
    const filterValue = selectedFilter.value?.value || selectedFilter.value;

    let res;
    switch (group.value) {
      case "option1":
        res = await getData(`followup/listbyinstructor/${filterValue}`);
        break;
      case "option2":
        res = await getData(`followup/listbyapprentice/${filterValue}`);
        break;
      default:
        break;
    }

    if ((!Array.isArray(res) && typeof res !== "object") || (Array.isArray(res) && res.length === 0)) {
      notifyWarningRequest("No se encontraron resultados");
    } else {
      notifySuccessRequest("Filtro aplicado correctamente");
      rows.value = Array.isArray(res) ? res : [res];
    }
  } catch (error) {
    console.error("Error al aplicar el filtro:", error);
    notifyErrorRequest("Error al aplicar el filtro");
  }
};


// Opciones para los radio buttons
const radioButtons = [
  { label: "Instructor", value: "option1" },
  { label: "Aprendiz", value: "option2" },
];

// Opciones dinámicas para los select
const getOptionsForSelectedRadio = computed(() => {
  switch (group.value) {
    case "option1":
      return getInstructors;
    case "option2":
      return getApprentices;
    default:
      return null;
  }
});

// Etiqueta dinámica del filtro
const filterLabel = computed(() => {
  switch (group.value) {
    case "option1":
      return "Filtrar por Instructor";
    case "option2":
      return "Filtrar por Aprendiz";
    default:
      return "Seleccione un filtro";
  }
});

// Campo de valor del filtro
const valueFilter = computed(() => "_id");


</script>

<template>
    <div class="q-pa-md">
      <div class="q-mb-md">
        <ButtonBack />
        <Title title="Seguimientos" />
      </div>
  
      <div class="filters">
        <div class="divFilter">
          <filterSelect
            :label="filterLabel"
            :value="valueFilter"
            :fetchOptions="getOptionsForSelectedRadio"
            v-model="selectedFilter"
            @filter="filter"
          />
        </div>
  
        <div class="q-pa-sm divRadioButtons">
          Filtrar por:
          <q-option-group inline :options="radioButtons" type="radio" v-model="group" />
        </div>
      </div>
  
      <q-table
        :rows="rows"
        :columns="columns"
        :filter="searchTerm"
        row-key="id"
        flat
        bordered
        :pagination="{ rowsPerPage: 7 }"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props" class="text-center">
            <q-select
              v-model="props.row.status"
              :options="['Verificada', 'Pendiente', 'Ejecutada']"
              outlined
              dense
              style="width: 100px;"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="text-center">
            <q-btn flat round color="green" icon="visibility" @click="viewDetails(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </template>

<style scoped>
.q-table {
  background-color: #ffffff;
}

.q-table th {
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  background-color: #f5f5f5;
  border-bottom: 2px solid #4caf50;
}

.q-table td {
  font-size: 14px;
  color: #000000;
}

.filter-container {
  display: flex;
  align-items: center;
}

.filter-section {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.q-input {
  margin-left: auto;
}
</style>