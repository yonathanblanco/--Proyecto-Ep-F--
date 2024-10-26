<script setup>
import { ref, onBeforeMount } from "vue";
import { format, useQuasar } from "quasar";
import { getData, putData } from "../services/apiClient";
import Table from "../components/tables/tablestatus.vue";
import buttonAdd from "../components/buttons/buttonAdd.vue";
import Title from "../components/tittle/tittle.vue";
import Modal from "../components/modal/modal.vue";


const fixed = ref(false);
const isEditing = ref(false);
const $q = useQuasar();

onBeforeMount(() => {
  getApprentices();
});

const columns = ref([
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
    name: "verAprendices",
    required: true,
    align: "center",
    label: "ver Aprendices",
  },
]);

const rows = ref([]);

async function getFiches() {
  const storedAuth = localStorage.getItem("auth");
  const token = storedAuth ? JSON.parse(storedAuth) : null;
  console.log(token.token);
  const res = await getData('/listFiche');
  rows.value = res;
  console.log(res);
}


</script>

<template>
  <div class="q-gutter-md divMain">
    <div>
      <div>
        <ButtonBack />
        <Title title="FICHAS" />
      </div>
    </div>

    <div>
      <Table :rows="rows" :columns="columns" :openEditModal="edit" />
    </div>

    <Modal
      :fixed="fixed"
      :isEditing="isEditing"
      entityName="Fichas"
      iconName="school"
      @update:fixed="(val) => (fixed = val)"
    >
      <template v-slot:modal-content>
        <q-input
          filled
          v-model="cdfiche"
          label="Cod. Ficha"
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
