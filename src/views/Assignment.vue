<script setup>
import Table from "@/components/tables/tablestatus.vue";
import ButtonOpenModal from "@/components/buttons/buttonAdd.vue";
import Title from "@/components/tittle/tittle.vue";
import { ref, onMounted } from "vue";
import { getData } from "@/services/apiClient.js";

const rows = ref([]);
let alert = ref(false);

const columns = ref([
  { name: "register", label: "Registro", field: "register" },
  { name: "followUpInstructor.name", label: "Instructor Seguimiento", field: "followUpInstructor.name", align: 'center' },
  { name: "technicalInstructor.name", label: "Instructor Técnico", field: "technicalInstructor.name", align: 'center' },
  { name: "projectInstructor.name", label: "Instructor Proyecto", field: "projectInstructor.name", align: 'center' },
  { name: "certificationdoc", label: "Certificación Doc", field: "certificationdoc", align: 'center' },
  { name: "judymentPhoto", label: "Foto", field: "judymentPhoto", align: 'center' },
  { name: "status", label: "Status", field: "status", align: 'center' },
  { name: "opciones", required: true, align: "center", label: "Opciones", align: 'center' }
]);
async function getApprentices() {
  let res = await getData("assignment/listallassignment");
  rows.value = res;
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
  <div>
    <Title title="ASIGNACIONES" />

    <div>
      <ButtonOpenModal titles="CREAR" icon="add" />
    </div>
    <div style="display: flex; justify-content: center; padding: 10px">
      <Table :rows="rows" :columns="columns" :onClickEdit="openDialog" />
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
  </div>
</template>

<style scoped></style>