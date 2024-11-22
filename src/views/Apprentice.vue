<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useQuasar } from "quasar";
import { getData, putData, postData } from "../services/apiClient";
import { getRepforaData } from "../services/apiRepfora";
import Table from "../components/tables/tablestatus.vue";
import ButtonBack from "../components/buttons/buttonBack.vue";
import Title from "../components/tittle/tittle.vue";
import Modal from "../components/modal/modal.vue";
import filterSelect from "../components/selectfilter/filterSelect.vue";

const fixed = ref(false);
const isEditing = ref(false);
const $q = useQuasar();

let tpDocument = ref("");
let numDocument = ref("");
let firstName = ref("");
let lastName = ref("");
let personalEmail = ref("");
let phone = ref("");
let ficheName = ref("");
let ficheNumber = ref("");
let name = ref("");

const group = ref("aprendiz");
const selectedFilter = ref("");
const rows = ref([]);
const radioButtons = ref([
  { label: "Aprendiz", value: "aprendiz" },
  { label: "Ficha", value: "ficha" },
  { label: "Estado", value: "estado" },
]);

onBeforeMount(() => {
  getApprentices();
});

const columns = ref([
  {
    name: "tpDocument",
    required: true,
    align: "center",
    label: "Tipo de Documento",
    field: "tpDocument",
    sortable: true,
    style: "width: 5%; text-align: center;",
  },
  {
    name: "numDocument",
    required: true,
    align: "center",
    label: "Num. Documento",
    field: "numDocument",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "firstName",
    required: true,
    align: "center",
    label: "Nombre",
    field: "firstName",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "lastName",
    required: true,
    align: "center",
    label: "Apellido",
    field: "lastName",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "phone",
    align: "center",
    label: "Teléfono",
    field: "phone",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "personalEmail",
    required: true,
    align: "center",
    label: "Email Personal",
    field: "personalEmail",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "ficheName",
    align: "center",
    label: "Nombre de Ficha",
    field: (row) => row.fiche?.name || "",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "ficheNumber",
    align: "center",
    label: "Num. Ficha",
    field: (row) => row.fiche?.number || "",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "status",
    align: "center",
    label: "Estado",
    field: "status",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "name",
    align: "center",
    label: "Modalidad",
    field: (row) => row.modality?.name || "",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "opciones",
    align: "center",
    label: "Opciones",
    field: "opciones",
    style: "width: 15%; text-align: center;",
  },
]);

async function getApprentices() {
  const storedAuth = localStorage.getItem("auth");
  const token = storedAuth ? JSON.parse(storedAuth) : null;

  if (!token || !token.token) {
    console.error("No token found");
    return;
  }

  try {
    const res = await getData("apprentice/listallapprentice");
    rows.value = res;
    console.log(res);
  } catch (error) {
    console.error("Error fetching apprentices", error);
  }
}

const fetchFicheOptions = async () => {
  const res = await getRepforaData("/fiches");
  return res.map(fiche => ({
    label: `${fiche.program?.name} - ${fiche.number}`,
    value: fiche.id
  }));
};

const fetchApprenticeOptions = () => {
  return rows.value.map(apprentice => ({
    label: `${apprentice.firstName} ${apprentice.lastName} - ${apprentice.numDocument}`,
    value: apprentice.id
  }));
};

const fetchStatusOptions = () => {
  return [
    { label: "Activa", value: "Activa" },
    { label: "Inactiva", value: "Inactiva" },
  ];
};

const getOptionsForSelectedRadio = computed(() => {
  switch (group.value) {
    case "ficha":
      return fetchFicheOptions;
    case "estado":
      return fetchStatusOptions;
    case "aprendiz":
      return fetchApprenticeOptions;
    default:
      return [];
  }
});

const filter = () => {
  const filteredRows = rows.value.filter(row => {
    const matchesFiche = group.value === "ficha" ? row.fiche?.id === selectedFilter.value : true;
    const matchesSearchTerm = group.value === "aprendiz" && selectedFilter.value
      ? row.firstName.toLowerCase().includes(selectedFilter.value.toLowerCase()) ||
        row.lastName.toLowerCase().includes(selectedFilter.value.toLowerCase()) ||
        row.numDocument.toLowerCase().includes(selectedFilter.value.toLowerCase())
      : true;
    const matchesStatus = group.value === "estado" && selectedFilter.value
      ? (selectedFilter.value === "Activa" && row.status === 1) ||
        (selectedFilter.value === "Inactiva" && row.status === 0)
      : true;

    return matchesFiche && matchesSearchTerm && matchesStatus;
  });

  rows.value = filteredRows;
};

function openAddModal() {
  fixed.value = true;
  isEditing.value = false;
  tpDocument.value = "";
  numDocument.value = "";
  firstName.value = "";
  lastName.value = "";
  phone.value = "";
  personalEmail.value = "";
  ficheName.value = "";
  ficheNumber.value = "";
  name.value = "";
}

function edit(row) {
  fixed.value = true;
  isEditing.value = true;
  tpDocument.value = row.tpDocument;
  numDocument.value = row.numDocument;
  firstName.value = row.firstName;
  lastName.value = row.lastName;
  phone.value = row.phone;
  personalEmail.value = row.personalEmail;
  name.value = row.modality?.name;
  ficheName.value = row.fiche?.name;
  ficheNumber.value = row.fiche?.number;
}

async function save() {
  const apprenticeData = {
    tpDocument: tpDocument.value,
    numDocument: numDocument.value,
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    personalEmail: personalEmail.value,
    modality: name.value,
    fiche: {
      name: ficheName.value,
      number: ficheNumber.value,
    },
  };

  try {
    if (isEditing.value) {
      const res = await putData(`apprentice/updateapprenticebyid/${numDocument.value}`, apprenticeData);
      console.log("Apprentice updated", res);
    } else {
      const res = await postData("apprentice/addapprentice", apprenticeData);
      console.log("Apprentice created", res);
    }
    await getApprentices();
    fixed.value = false;
  } catch (error) {
    console.error("Error saving apprentice", error);
  }
}

async function activate(id) {
  const res = await putData(`apprentice/enableapprentice/${id}`);
  console.log(res);
  await getApprentices();
}

async function deactivate(id) {
  const res = await putData(`apprentice/disableapprentice/${id}`);
  console.log(res);
  await getApprentices();
}
</script>

<template>
  <div class="q-gutter-md divMain">
    <div>
      <ButtonBack />
      <Title title="APRENDICES" />
    </div>

    <!-- Nuevo componente de filtros -->
    <div class="filter-section q-mb-md">
      <div class="q-gutter-md">
        <q-btn 
          icon="add" 
          label="Crear" 
          color="green-9"
          class="text-white"
          @click="openAddModal"
        />
        <q-btn 
          icon="upload_file" 
          label="Subir Archivo" 
          color="green-9"
          class="text-white"
          @click="handleFileUpload"
        />
      </div>

      <div class="filter-controls q-mt-md">
        <div class="text-subtitle2 q-mb-sm">Realizar filtro por</div>
        <div class="q-pa-sm rounded-borders divRadioButtons">
          Filtrar por:
          <q-option-group inline :options="radioButtons" type="radio" v-model="group" />
        </div>
        <div class="divFilter">
          <filterSelect 
            :label="group === 'aprendiz' ? 'Buscar aprendiz' : group === 'ficha' ? 'Buscar ficha' : 'Buscar estado'"
            :fetchOptions="getOptionsForSelectedRadio"
            v-model="selectedFilter"
            @filter="filter"
          />
        </div>
      </div>
    </div>

    <div>
      <Table 
        :rows="rows" 
        :columns="columns" 
        :openEditModal="edit" 
        :activate="activate" 
        :deactivate="deactivate" 
      />
    </div>

    <Modal :fixed="fixed" :isEditing="isEditing" entityName="Aprendices" iconName="school"
      @update:fixed="(val) => (fixed = val)" @save="save">
      <template v-slot:modal-content>
        <q-input filled v-model="tpDocument" label="Tipo de Documento" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="assignment" />
          </template>
        </q-input>
        
        <q-input filled v-model="numDocument" label="Num. Documento" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="confirmation_number" />
          </template>
        </q-input>

        <q-input filled v-model="firstName" label="Nombre" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="person" />
          </template>
        </q-input>

        <q-input filled v-model="lastName" label="Apellido" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="person_outline" />
          </template>
        </q-input>

        <q-input filled v-model="phone" label="Teléfono" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="phone" />
          </template>
        </q-input>

        <q-input filled v-model="personalEmail" label="Email Personal" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="email" />
          </template>
        </q-input>

        <q-input filled v-model="name" label="Modalidad Epata Productiva" class="input thin-input"
          label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="book" />
          </template>
        </q-input>

        <q-input filled v-model="ficheName" label="Nombre de Ficha" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="note" />
          </template>
        </q-input>

        <q-input filled v-model="ficheNumber" label="Num. Ficha" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="note" />
          </template>
        </q-input>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.input {
  margin: 7px 0;
  color: "green";
  border-color: "green";
}

.divMain {
  padding: 0 1.5%;
  margin-top: 20px;
}

.filter-section {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.filter-controls {
  border-top: 1px solid #e0e0e0;
  padding-top: 1rem;
}

.divRadioButtons {
  margin-bottom: 1rem;
}
</style>