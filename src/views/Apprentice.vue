<script setup>
import Table from "../components/tables/table.vue";
import ButtonOpenModal from "../components/buttons/buttonOpenModal.vue";
import Title from '../components/tittle/tittle.vue'
import { ref, onMounted } from "vue";
import { getData } from "../services/apiClient.js";

const rows = ref([]);


let alert = ref(false);

const columns = ref([
  { name: "fiche", label: "Ficha", field: "fiche", align: "center", field: (row) => row.fiche.name },
  { name: "tpdocument", label: "Tipo Documento", align: "center", field: "tpdocument", sortable: true },
  { name: "numdocument", align: "center", label: "Número Documento", field: "numdocument", sortable: true },
  { name: "firstname", label: "Nombre", align: "center", field: "firstname", sortable: true },
  { name: "lastname", label: "Apellido", align: "center", field: "lastname", sortable: true },
  { name: "phone", label: "Teléfono", align: "center", field: "phone", sortable: true },
  { name: "email", label: "Correo Electrónico", align: "center", field: "email", sortable: true },
  { name: "modality", label: "Modalidad", align: "center", field: "modality", sortable: true },
  { name: "status", label: "Estado", align: "center", field: "status", sortable: true },
  { name: "editar", label: "Editar", align: "center", field: "editar" },
  { name: "activar", label: "Activar/Desactivar", align: "center", field: "activar" },
]);

async function getApprentices(){
  let res = await getData("apprentice/listallapprentice")
  rows.value = res
  console.log(res);
  
}

onMounted(() => {
  getApprentices();
});

function openDialog(row) {
  alert.value = true;
  console.log(row);
}
</script>

<template>

<Title title="APRENDICES"/>

  <div>
    <ButtonOpenModal titles="CREAR" icon="add" />
  </div>
  <div style="display: flex; justify-content: center; padding: 10px">
  
    <Table
      :rows="rows"
      :columns="columns"
      :onClickEdit="openDialog"
    />
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alerta</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro la
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="alert = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

  
</template>