<template>
  <q-layout view="lHh Lpr lff" class="layout">
    <q-page-container>
      <Header :drawerOpen="drawerOpen" @toggleDrawer="toggleDrawer"></Header>
      <Sidebar :drawerOpen="drawerOpen" @update:drawerOpen="toggleDrawer" />

      <br />

      <div class="table-container">
        <div>
          <ButtonBack />
          <Title title="REGISTRO" />
        </div>

        <div style="display: flex; align-items: center !important">
          <q-btn to="/home" dense unelevated round color="primary" icon="arrow_back" text-color="white" />
          <hr id="hr" color="primary" />
        </div>

        <CustomButton label="CREAR REGISTRO" :onClickFunction="openDialog" :icon="['fa', 'circle-plus']">
        </CustomButton>

        <Table :rows="rows" :columns="columns" :onClickEdit="openDialog" :onClickActivate="toggleStatus"></Table>
      </div>

      <TableModal v-model:dialog="TableModalDialog" :row="selectedRow">
        <template v-slot>
          <div class="table-container">
            <h5>{{ title2 }}</h5>
            <hr id="hr" color="primary" />
            <Table :rows="rows2" :columns="columns2" :onClickView="openDialogWithRow"></Table>
          </div>
        </template>
      </TableModal>

      <FormModal :modelValue="dialog" :title="dialogTitle" @update:modelValue="dialog = $event" :next="nextFormModal">
        <template #content>
          <div class="input-grid">
            <CustomSelect map-options label="Seleccionar modalidad" v-model="modalityId" required
              :options="modalitiesOptions" optionLabel="name" optionValue="_id" errorMessage="Modalidad requerida"
              icon="shapes" type="text">
            </CustomSelect>
          </div>
        </template>
      </FormModal>

      <FormModal :modelValue="secondModaldialog" :title="dialogTitle" :onSave="saveRegister"
        @update:modelValue="secondModaldialog = $event">
        <template #content>
          <div class="input-grid">
            <CustomSelect map-options label="Aprendiz" v-model="apprentice" @filter="filterApprentice" required
              :options="apprenticeOptions" optionLabel="apprenticeName" optionValue="apprenticeId"
              errorMessage="Aprendiz requerido" icon="users-line" type="text">
            </CustomSelect>

            <Input id="startDate" filled label="Fecha de Inicio" v-model="startDate" required
              errorMessage="Fecha requerida" icon="calendar-days" type="date" />
            <Input id="endDate" filled label="Fecha de Fin" v-model="endDate" required errorMessage="Fecha requerida"
              icon="calendar-days" type="date" />
            <Input id="company" filled label="Nombre de la Empresa" v-model="company" required
              errorMessage="Empresa requerida" icon="spell-check" type="text" />
            <Input id="phoneCompany" filled label="Teléfono de la empresa" v-model="phoneCompany" required
              errorMessage="Número de contacto requerido" icon="phone" type="text" />
            <Input id="addressCompany" filled label="Dirección de la empresa" v-model="addressCompany" required
              errorMessage="Dirección requerida" icon="map-location-dot" type="text" />
            <Input id="owner" filled label="Dueño de la Empresa" v-model="owner" required errorMessage="Dueño requerido"
              icon="user-tie" type="text" />
            <Input id="docAlternative" filled label="Documento Alternativo" v-model="docAlternative" required
              errorMessage="Documento requerido" icon="file-invoice" type="text" />
            <Input id="hour" filled label="Horas" v-model="hour" required errorMessage="Horas requeridas" icon="clock"
              type="text" />
            <Input id="businessProyectHour" filled label="Horas del Proyecto de Negocio" v-model="businessProyectHour"
              required errorMessage="Horas requeridas" icon="stopwatch" type="text" />
            <Input id="productiveProjectHour" filled label="Horas del Proyecto Productivo"
              v-model="productiveProjectHour" required errorMessage="Horas requeridas" icon="stopwatch" type="text" />
            <Input id="mailCompany" filled label="Email de la empresa" v-model="mailCompany" required
              errorMessage="Email de la empresa requerido" icon="envelope" type="text" />
          </div>
        </template>
      </FormModal>
    </q-page-container>
    <q-dialog v-model="dialogFull" persistent :maximized="maximizedToggle" transition-show="slide-up"
      transition-hide="slide-down">
      <q-card class="text-dark ">
        <q-bar class="bg-primary text-white">
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div class="modalBody">
          <!-- Formulario de datos planos -->
          <div class="titulo">
            <div>
              <div style="margin: 50px; border-bottom: 4px solid green; font-size: 4em;">{{ tituloRegistro }}
              </div>
              <!-- Comprobar logica de validacion de q-select -->
              <!-- <pre>{{ modalityId.name?.toLowerCase()=="proyecto productivo" || modalityId.name?.toLowerCase()=="proyecto empresarial" }}</pre>
              <pre>{{ tipos }}</pre> -->
            </div>
          </div>
          <div class="formulario" filled>
            <div class="contFormFila">
              <h5>Datos</h5>
              <div class="contInput">
                <q-input v-model="ownerModal" label="Jefe inmediato" label-color="primary" label-class="customLabel"
                  class="long-field">
                  <template v-slot:prepend>
                    <q-icon color="green-10" name="person" />
                  </template>
                </q-input>
                <q-input v-model="docAlternativeModal" label="Documentos alternativos" label-color="primary"
                  label-class="customLabel" class="long-field">
                  <template v-slot:prepend>
                    <q-icon color="green-10" name="description" />
                  </template>
                </q-input>
                <q-input v-model="hourProductiveStageApprenticeModal" label="Num. Horas etapa productiva"
                  label-color="primary" label-class="customLabel" class="long-field">
                  <template v-slot:prepend>
                    <q-icon color="green-10" name="schedule" />
                  </template>
                </q-input>
                <q-input v-model="startDateModal" label="Fecha de inicio" type="date" label-class="customLabel"
                  label-color="primary" class="long">
                  <template v-slot:prepend>
                    <q-icon color="green-10" name="event" />
                  </template>
                </q-input>
                <q-input v-model="endDateModal" label="Fecha final" type="date" label-class="customLabel"
                  label-color="primary" class="long">
                  <template v-slot:prepend>
                    <q-icon color="green-10" name="event" />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="contFormFila">
              <h5>Datos empresa</h5>
              <div class="contInput">
                <q-input v-model="companyModal" label="Nombre Empresa" label-color="primary" label-class="customLabel"
                  class="long-field">
                  <template v-slot:prepend>
                    <q-icon color="green-10" name="business" />
                  </template>
                </q-input>
                <q-input v-model="phoneCompanyModal" label="Número Empresa" label-color="primary"
                  label-class="customLabel" class="long-field">
                  <template v-slot:prepend>
                    <q-icon color="green-10" name="phone" />
                  </template>
                </q-input>
                <q-input v-model="mailCompanyModal" label="Correo Empresa" label-color="primary"
                  label-class="customLabel" class="long-field">
                  <template v-slot:prepend>
                    <q-icon color="green-10" name="email" />
                  </template>
                </q-input>
                <q-input v-model="addressCompanyModal" label="Dirección Empresa" label-color="primary"
                  label-class="customLabel" class="long-field">
                  <template v-slot:prepend>
                    <q-icon color="green-10" name="location_on" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <!-- Fin de Formulario de datos planos -->
          <!-- Tabla instructores -->
          <div>
            <div class="contTablaInstructor">
              <div>
                <div style="margin: 50px; border-bottom: 4px solid green; font-size: 4em;text-align: center">
                  Instructores
                </div>
              </div>
              <div style="padding: 40px">
                <div style="display: flex; justify-content: end; gap: 10px">
                  <q-select filled clearable v-model="busquedaInstructor" use-input input-debounce="0"
                    label="Buscar instructor por nombre..." :options="instructoresFiltrados" option-label="name"
                    @filter="filtroInstructores" style="width: 40%" transition-show="flip-up"
                    transition-hide="flip-down">
                  </q-select>
                  <q-btn @click="listaInstructores" icon="add" color="primary" />
                </div>
                <div>
                  <!-- Comprobar resultado de la busquedaInstructor -->
                  <pre>{{ busquedaInstructor }}</pre>
                  <!-- comprobar resultado de instructores agregados -->
                  <!-- <pre>{{ instructoresAgregados }}</pre> -->
                  <q-table :rows="instructoresAgregados" :columns="columnsInstructores" row-key="id" flat bordered>
                    <template v-slot:body-cell-no="props">
                      <q-td :props="props">
                        {{ props.pageIndex + 1 }}
                      </q-td>
                    </template>
                    <template v-slot:body-cell-tipo="props">
                      <div class="contTypeSelect">
                        <q-select class="typeSelect" borderless v-model="props.row.tipo" :options="tipos" />
                      </div>
                    </template>
                    <template v-slot:body-cell-options="props">
                      <q-td>
                        <div class="divBorrarFila">
                          <q-btn @click="() => borrarFilaInstructor(props.row)" icon="delete" color="negative" />
                        </div>
                      </q-td>
                    </template>
                  </q-table>
                </div>
              </div>
              <!-- Fin tabla instructor -->
            </div>
            <!--Tabla aprendices  -->
            <div>
              <div style="margin: 50px; border-bottom: 4px solid green; font-size: 4em;text-align: center">Aprendices
              </div>
            </div>
            <div style="padding: 40px">
              <div style="display: flex; justify-content: end; gap: 10px">
                <q-select filled clearable v-model="busquedaAprendiz" use-input input-debounce="0"
                  label="Buscar instructor por nombre..." :options="aprendicesFiltrados"
                  :option-label="option => `${option.firstName} ${option.lastName} - ${option.numDocument}`"
                  @filter="filtroAprendices" style="width: 40%" transition-show="flip-up" transition-hide="flip-down">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        <q-btn style="width: 20%" @click="open = true" icon="add" color="primary"></q-btn>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-btn @click="listaAprendices" icon="add" color="primary" />
              </div>
              <div>
                <!-- Comprobar resultado de la busquedaInstructor -->
                <pre>{{ busquedaAprendiz }}</pre>
                <q-table :rows="aprendicesAgregados" :columns="columnsAprendices" row-key="id" flat bordered>
                  <template v-slot:body-cell-no="props">
                    <q-td :props="props">
                      {{ props.pageIndex + 1 }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-options="props">
                    <q-td>
                      <div class="divBorrarFila">
                        <q-btn @click="() => borrarFilaAprendiz(props.row)" icon="delete" color="negative" />
                      </div>
                    </q-td>
                  </template>
                </q-table>
              </div>
            </div>
          </div>
        </div>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="primary" label="Guardar" @click="saveRegisterModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <Footer></Footer>
  </q-layout>
</template>


<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import Title from "@/components/tittle/tittle.vue";
import Table from "@/components/tables/TableRegister.vue";
import CustomButton from "@/components/buttons/CustomButton.vue";
import CustomSelect from "@/components/inputs/CustomSelect.vue";
import TableModal from "@/components/modal/TableModal.vue";
import FormModal from "@/components/modal/FormModal.vue";
import Input from "@/components/inputs/CustomInput.vue";
import { notifyErrorRequest, notifySuccessRequest,} from "@/utils/notify";
import { getData, postData } from "@/services/apiClient.js";

let tituloRegistro = ref("Agregar registro");
const dialog = ref(false);
let dialogFull = ref(false);
const maximizedToggle = ref(true);
const secondModaldialog = ref(false);
const tableModalDialog = ref(false);
const dialogTitle = ref("SELECCIONE MODALIDAD");
const drawerOpen = ref(true);

const modalitiesOptions = ref([]);
const apprenticeOptions = ref([]);

//v-models de los inputs
const idApprentice = ref("");
const modalityId = ref("");
const startDate = ref("");
const endDate = ref("");
const company = ref("");
const phoneCompany = ref("");
const addressCompany = ref("");
const owner = ref("");
const docAlternative = ref("");
const hour = ref("");
const businessProyectHour = ref("");
const productiveProjectHour = ref("");
const mailCompany = ref("");

//v-models de los inputs del modal
const idApprenticeModal = ref("");
const startDateModal = ref("");
const endDateModal = ref("");
const companyModal = ref("");
const phoneCompanyModal = ref("");
const addressCompanyModal = ref("");
const ownerModal = ref("");
const docAlternativeModal = ref("");
const hourModal = ref("");
const businessProyectHourModal = ref("");
const hourProductiveStageApprenticeModal = ref("");
const mailCompanyModal = ref("");

const assignment = ref([{}]);

const idApprentices = ref([])

const registerData = {
  idApprentice: idApprentice.value,
  modalityId: modalityId.value,
  startDate: startDate.value,
  endDate: endDate.value,
  company: company.value,
  phoneCompany: phoneCompany.value,
  addressCompany: addressCompany.value,
  owner: owner.value,
  docAlternative: docAlternative.value,
  hour: hour.value,
  businessProyectHour: businessProyectHour.value,
  productiveProjectHour: productiveProjectHour.value,
  mailCompany: mailCompany.value,
};

const registerDataModal = computed(() => ({
  idApprentice: aprendicesAgregados.value.map(aprendiz => aprendiz.id),
  idModality: modalityId.value._id,
  startDate: startDateModal.value,
  endDate: endDateModal.value,
  company: companyModal.value,
  phoneCompany: phoneCompanyModal.value,
  owner: ownerModal.value,
  docAlternative: docAlternativeModal.value,
  hourProductiveStageApprentice: hourProductiveStageApprenticeModal.value,
  mailCompany: mailCompanyModal.value,
  addressCompany: addressCompanyModal.value,
}));

const assignmentDataModal = ref([{
  followUpInstructor: [],
  technicalInstructor: [],
  projectInstructor: []
}]);

let busquedaInstructor = ref(null);

const rows = ref([]);
const instructores = ref([]);
const instructoresAgregados = ref([]);
const instructoresFiltrados = ref([]);
const aprendices = ref([]);
const aprendicesAgregados = ref([]);
const aprendicesFiltrados = ref([]);
let busquedaAprendiz = ref(null);
const tipos = ref([])
const columns = ref([
  {
    name: "numberList",
    required: true,
    label: "N°",
    align: "center",
    field: "numberList",
  },
  {
    name: "name",
    required: true,
    label: "NOMBRE APRENDIZ",
    align: "center",
    field: "apprenticeName",
    sortable: true,
  },
  {
    name: "ficheNumber",
    required: true,
    label: "COD. FICHA",
    align: "center",
    field: "ficheNumber",
    sortable: true,
  },
  {
    name: "ficheName",
    required: true,
    label: "FICHA",
    align: "center",
    field: "ficheName",
    sortable: true,
  },
  {
    name: "modality",
    align: "center",
    label: "MODALIDAD",
    field: "modalityName",
    sortable: true,
  },
  {
    name: "startDate",
    required: true,
    label: "FECHA INICIO",
    align: "center",
    field: "startDate",
    sortable: true,
  },
  {
    name: "endDate",
    align: "center",
    label: "FECHA FIN",
    field: "endDate",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "endDate",
    sortable: true,
  },
  {
    name: "opciones",
    align: "center",
    label: "OPCIONES",
    field: "opciones"
  },
]);

const columnsInstructores = ref([
  {
    name: "no",
    required: true,
    label: "N°",
    align: "center",
    field: "no",
  },
  {
    name: "name",
    required: true,
    label: "Nombre Instructor",
    align: "center",
    field: "name",
  },
  {
    name: "numdocument",
    required: true,
    label: "N° documento",
    align: "center",
    field: "numdocument",
  },
  {
    name: "email",
    required: true,
    label: "Email",
    align: "center",
    field: "email",
  },
  {
    name: "phone",
    required: true,
    label: "Telefono",
    align: "center",
    field: "phone",
  },
  {
    name: "thematicarea",
    required: true,
    label: "Area tematica",
    align: "center",
    field: "thematicarea",
  },
  {
    name: "tipo",
    required: true,
    label: "Tipo de instructor",
    align: "center",
    field: "tipo",
  },
  {
    name: "options",
    label: "opciones",
    align: "center",
    sortable: true,
  }
]);

const columnsAprendices = ref([
  {
    name: "no",
    required: true,
    label: "N°",
    align: "center",
    field: "no",
  },
  {
    name: "name",
    required: true,
    label: "Nombre Aprendiz",
    align: "center",
    field: row => `${row.firstName} ${row.lastName}`,
  },
  {
    name: "numDocument",
    required: true,
    label: "N° documento",
    align: "center",
    field: "numDocument",
  },
  {
    name: "personalEmail",
    required: true,
    label: "Email",
    align: "center",
    field: "personalEmail",
  },
  {
    name: "phone",
    required: true,
    label: "Telefono",
    align: "center",
    field: "phone",
  },
  {
    name: "numfiche",
    required: true,
    label: "Ficha",
    align: "center",
    field: "numfiche",
  },
  {
    name: "fiche",
    required: true,
    label: "Ficha",
    align: "center",
    field: "fiche",
  },
  {
    name: "options",
    label: "opciones",
    align: "center",
    sortable: true,
  }
])

onBeforeMount(() => {
  getDataForTable();
  getInstructores();
});

async function getInstructores() {
  const response = await getData(`Repfora/instructors`);
  console.log(response);
  instructores.value = response;
}

function listaInstructores() {
  if (!busquedaInstructor.value) {
    notifyErrorRequest("Busque el nombre del instructor");
  } else {
    instructoresAgregados.value.push({
      id: busquedaInstructor.value._id,
      name: busquedaInstructor.value.name,
      tpdocument: busquedaInstructor.value.tpdocument,
      numdocument: busquedaInstructor.value.numdocument,
      email: busquedaInstructor.value.email,
      phone: busquedaInstructor.value.phone,
      thematicarea: busquedaInstructor.value.thematicarea,
      tipo: "",
    });
    console.log(instructores.value);
    console.log(instructoresAgregados.value);

  }
}

function listaAprendices() {
  if (!busquedaAprendiz.value) {
    notifyErrorRequest("Busque el nombre del aprendiz");
  } else {
    aprendicesAgregados.value.push({
      id: busquedaAprendiz.value._id,
      firstName: busquedaAprendiz.value.firstName,
      lastName: busquedaAprendiz.value.lastName,
      tpdocument: busquedaAprendiz.value.tpdocument,
      numDocument: busquedaAprendiz.value.numDocument,
      personalEmail: busquedaAprendiz.value.personalEmail,
      phone: busquedaAprendiz.value.phone,
      numfiche: busquedaAprendiz.value.fiche.number,
      fiche: busquedaAprendiz.value.fiche.name,
    });
    console.log(aprendices.value);
  }
}


// FUNCION DE SEBASTIAN

// const filtro = (val, update) => {
//   /* productosFiltrados.value =  !nombre ? productosApi.value : productosApi.value.filter((item)=> item.nombre.toLowerCase().includes(nombre)) 
//   console.log(productosFiltrados.value); */

//   if (val == "") {
//     update(() => {
//       instructoresFiltrados.value = instructores.value;
//     });
//     return;
//   }

//   update(() => {
//     const needle = val.toLowerCase();
//     instructoresFiltrados.value = instructores.value.filter((item) =>
//       item.name.toLowerCase().includes(needle)
//     );
//     console.log(needle);
//   });
// };

const filtroInstructores = (val, update) => {
  /* productosFiltrados.value =  !nombre ? productosApi.value : productosApi.value.filter((item)=> item.nombre.toLowerCase().includes(nombre)) 
  console.log(productosFiltrados.value); */
  if (val == "") {
    update(() => {
      instructoresFiltrados.value = instructores.value;
    });

    return;
  }

  update(() => {
    // Filtra los instructores aquí
    instructoresFiltrados.value = instructoresFiltrados.value.filter(instructor =>
      instructor.name.toLowerCase().includes(val.toLowerCase())
    );
  });
};


const borrarFilaInstructor = (row) => {
  instructoresAgregados.value = instructoresAgregados.value.filter(instructor => instructor.id !== row.id);
};

const filtroAprendices = (val, update) => {
  if (val == "") {
    update(() => {
      aprendicesFiltrados.value = aprendices.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    aprendicesFiltrados.value = aprendices.value.filter(aprendiz =>
      `${aprendiz.numDocument} ${aprendiz.firstName} ${aprendiz.lastName}`.toLowerCase().includes(needle)
    );
  });
};

const borrarFilaAprendiz = (row) => {
  aprendicesAgregados.value = aprendicesAgregados.value.filter(aprendiz => aprendiz.id !== row.id);
};

async function getDataForTable() {
  const getRegisters = await getData("Register/listallregister");
  const getApprentices = await getData("Apprentice/listallapprentice");
  const getModalities = await getData("Modality/listallmodality");

  // Para usar en el modal e imprimir los aprendices en el filtro
  aprendices.value = getApprentices.apprentices;

  const registersWithApprenticeAndModality = getRegisters.register.map(
    (register) => {
      const apprentice = getApprentices.apprentices.find(
        (apprentice) => apprentice._id === register.idApprentice[0]
      );

      console.log("apprentice: ", apprentice);

      const modality = getModalities.modality.find(
        (modality) => modality._id === register.idModality
      );

      modalitiesOptions.value = getModalities.modality.map((modality) => ({
        _id: modality._id,
        name: modality.name,
      }));

      apprenticeOptions.value = getApprentices.apprentices.map(
        (apprentice) => ({
          apprenticeId: apprentice._id,
          apprenticeName:
            `${apprentice.firstName} ${apprentice.lastName} - ${apprentice.fiche.name}`.trim(),
        })
      );

      return {
        ...register,
        apprenticeName: apprentice
          ? `${apprentice.firstName} ${apprentice.lastName}`
          : "No Encontrado",
        ficheNumber: apprentice
          ? `${apprentice.fiche.number}`
          : "No Encontrada",
        ficheName: apprentice ? `${apprentice.fiche.name}` : "No Encontrada",
        modalityName: modality ? modality.name : "No Encontrada",
        startDate: formatDate(register.startDate),
        endDate: formatDate(register.endDate),
      };
    }
  );

  rows.value = registersWithApprenticeAndModality;
}

function formatDate(date) {
  if (!date) return "No Encontrado";
  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}

function nextFormModal() {
  console.log(modalityId.value.name);
  dialogTitle.value = "NUEVO REGISTRO ETAPA PRODUCTIVA ";
  if (
    modalityId.value.name.toLowerCase() == "pasantia" ||
    modalityId.value.name.toLowerCase() == "vinculo laboral"
  ) {
    dialog.value = false;
    secondModaldialog.value = true;
  } else {
    dialog.value = false;
    dialogFull.value = true;
    if (modalityId.value.name?.toLowerCase() == "proyecto productivo" || modalityId.value.name?.toLowerCase() == "proyecto empresarial") {
      tipos.value = ['Seguimiento', 'Tecnico']
    } else {
      tipos.value = ['Seguimiento', 'Tecnico', 'Proyecto']
    }
  }
}

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  dialog.value = true;
};

const saveRegister = async () => {
  try {
    let response = await postData("Register/addregister", registerData);

    // Si la respuesta es exitosa, actualizamos la tabla y cerramos el modal
    rows.value = response;
    dialog.value = false;
    notifySuccessRequest("Asignación guardada exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar la asignación");
  }
};
watch([modalityId, instructoresAgregados], ([newModalityId, newInstructoresAgregados]) => {
  const followupInstructor = [];
  const technicalInstructor = [];
  const projectInstructor = [];

  newInstructoresAgregados.forEach(instructor => {
    if (instructor.tipo.toLowerCase() === "seguimiento") {
      followupInstructor.push({
        idInstructor: instructor.id,
        name: instructor.name,
        email: instructor.email
      });
    } else if (instructor.tipo.toLowerCase() === "tecnico") {
      technicalInstructor.push({
        idInstructor: instructor.id,
        name: instructor.name,
        email: instructor.email
      });
    } else if (instructor.tipo.toLowerCase() === "proyecto") {
      projectInstructor.push({
        idInstructor: instructor.id,
        name: instructor.name,
        email: instructor.email
      });
    }
  });

  if (newModalityId.name?.toLowerCase() === "proyecto productivo" || newModalityId.name?.toLowerCase() === "proyecto empresarial") {
    assignmentDataModal.value = [{
      followupInstructor,
      technicalInstructor
    }];
  } else {
    assignmentDataModal.value = [{
      followupInstructor,
      technicalInstructor,
      projectInstructor
    }];
  }

  console.log('assignmentDataModal updated:', assignmentDataModal.value);
}, { deep: true });

const saveRegisterModal = async () => {
  console.log(registerDataModal.value);

  console.log(assignmentDataModal.value);

  try {
    let response = await postData("Register/addregister", {
      ...registerDataModal.value,
      assignment: assignmentDataModal.value
    });
    // Si la respuesta es exitosa, actualizamos la tabla y cerramos el modal
    rows.value = response;
    dialogFull.value = false;
    notifySuccessRequest("Asignación guardada exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar la asignación");
  }
};

async function toggleStatus(row) {
  try {
    const url =
      row.status === 0
        ? `Register/enableregister/${row._id}`
        : `Register/disableregister/${row._id}`;
    await putData(url, {});
    await getRegisters();
    notifySuccessRequest("Estado cambiado exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al cambiar el estado del registro");
  }
}
</script>

<style scoped>
.divBorrarFila {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contTypeSelect {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.contTablaInstructor {
  background-color: rgb(236, 235, 235);
  padding: 20px 0;
}

.contFormFila {
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
}

.contInput {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.customLabel {
  font-size: large;
}

.formulario {
  background-color: rgb(248, 248, 248);
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 40px;
  margin: 80px 40px;
  gap: 40px;
  border-radius: 10px;
  width: 100%;
}

.titulo {
  text-align: center;
  margin: 0;
}

.long-field {
  width: 400px; 
}

.long{
  width: 170px;
}

</style>
