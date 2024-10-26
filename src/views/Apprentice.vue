<script setup>
import { ref, onBeforeMount } from "vue";
import { format, useQuasar } from "quasar";
import { getData, putData } from "../services/apiClient";
import Table from "../components/tables/tablestatus.vue";
import buttonAdd from "../components/buttons/buttonAdd.vue";
import Title from "../components/tittle/tittle.vue";
import Modal from "../components/modal/modal.vue";
import ButtonBack from '../components/buttons/buttonBack.vue';



const fixed = ref(false);
const isEditing = ref(false);
const $q = useQuasar();

onBeforeMount(() => {
  getApprentices();
});

const columns = ref([
  {
    name: "tpdocument",
    required: true,
    align: "center",
    label: "Tipo de Documento",
    field: "tpdocument",
    sortable: true,
  },
  {
    name: "numdocument",
    required: true,
    align: "center",
    label: "Num. Documento",
    field: "numdocument",
    sortable: true,
  },
  {
    name: "firstname",
    required: true,
    align: "center",
    label: "Nombre",
    field: "firstname",
    sortable: true,
  },
  {
    name: "lastname",
    required: true,
    align: "center",
    label: "Apellido",
    field: "lastname",
    sortable: true,
  },
  {
    name: "phone",
    align: "center",
    label: "Teléfono",
    field: "phone",
    sortable: true,
  },
  {
    name: "personalEmail",
    required: true,
    align: "center",
    label: "Email Personal",
    field: "personalEmail",
    sortable: true,
  },
  {
    name: "institucionalEmail",
    required: true,
    align: "center",
    label: "Email Institucional",
    field: "institucionalEmail",
    sortable: true,
  },
  {
    name: "ficheName",
    align: "center",
    label: "Nombre de Ficha",
    field: (row) => row.fiche?.name || "",
    sortable: true,
  },
  {
    name: "ficheNumber",
    align: "center",
    label: "Num. Ficha",
    field: (row) => row.fiche?.number || "",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Estado",
    field: "status",
    sortable: true,
  },
  {
    name: "opciones",
    required: true,
    align: "center",
    label: "Opciones",
  },
]);

const rows = ref([]);

async function getApprentices() {
  const storedAuth = localStorage.getItem('auth');
const token = storedAuth ? JSON.parse(storedAuth) : null;
console.log(token.token);
  const res = await getData("apprentice/listallapprentice");
  rows.value = res;
  console.log(res);
}

function openAddModal() {
  fixed.value = true;
  isEditing.value = false;
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
  const res = await putData('apprentice/disableapprentice/${id}');
  console.log(res);
  await getApprentices();
}
</script>

<template>
  <div class="q-gutter-md divMain">
    <div>
      <ButtonBack />
      <Title title="APRENDICES" />
      <div>
        <buttonAdd :openAddModal="openAddModal" />
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

    <Modal
      :fixed="fixed"
      :isEditing="isEditing"
      entityName="Aprendices"
      iconName="school"
      @update:fixed="(val) => (fixed = val)"
    >
      <template v-slot:modal-content>
        <q-input
          filled
          v-model="tpDocument"
          label="Tipo de Documento"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="assignment" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="numDocument"
          label="Num. Documento"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="confirmation_number" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="firstName"
          label="Nombre"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="person" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="lastName"
          label="Apellido"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="person_outline" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="phone"
          label="Teléfono"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="phone" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="email"
          label="Email Personal"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="email" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="emailInstitucional"
          label="Email Institucional"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="email" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="modality"
          label="Modalidad Epata Productiva"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="book" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="fiche"
          label="Ficha"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="note" />
          </template>
        </q-input>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
/* Inputs */

.input {
  margin: 7px 0;
  color: "green";
  border-color: "green";
}

/* divs */
.divMain {
  padding: 0 1.5%;
  margin-top: 20px;
}
</style>