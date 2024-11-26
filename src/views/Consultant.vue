<template>
    <div class="dashboard">
      <div class="container">
        
        <div class="grid">
          <!-- Datos del Aprendiz -->
          <div class="card">
            <h2 class="card-title">
              <UserIcon class="icon" />
              DATOS DEL APRENDIZ
            </h2>
            <div class="aprendiz-info">
                <q-item avatar class="no-padding">
            <q-avatar class="imgSena">
              <img :src="iconSena" />
            </q-avatar>
          </q-item>
              <div>
                <p class="aprendiz-nombre">NOMBRE COMPLETO APRENDIZ</p>
                <p class="aprendiz-documento">N° Documento: 0.000.000.000</p>
              </div>
            </div>
            <div class="aprendiz-details">
              <div>
                <p class="detail-label">FICHA</p>
                <p>NOMBRE DE LA FICHA</p>
              </div>
              <div>
                <p class="detail-label">CÓDIGO FICHA</p>
                <p>CÓDIGO DE LA FICHA</p>
              </div>
            </div>
          </div>
  
          <!-- Información Etapa Productiva -->
          <div class="card">
            <h2 class="card-title">
              <ClipboardIcon class="icon" />
              INFORMACIÓN ETAPA PRODUCTIVA
            </h2>
            <div class="etapa-info">
              <div>
                <p class="detail-label">MODALIDAD</p>
                <p>NOMBRE MODALIDAD</p>
              </div>
              <div class="fecha-grid">
                <div>
                  <p class="detail-label">FECHA INICIO</p>
                  <p>00/00/00</p>
                </div>
                <div>
                  <p class="detail-label">FECHA FIN</p>
                  <p>00/00/00</p>
                </div>
              </div>
              <div>
                <p class="detail-label">INSTRUCTOR DE SEGUIMIENTO</p>
                <p>NOMBRE INSTRUCTOR DE SEGUIMIENTO</p>
              </div>
              <div>
                <p class="detail-label">ESTADO ETAPA PRODUCTIVA</p>
                <p>ESTADO DEL APRENDIZ</p>
              </div>
            </div>
          </div>
  
          <!-- Bitácoras y Seguimientos -->
          <div class="card">
            <h2 class="card-title">
              <ClipboardCheckIcon class="icon" />
              BITACORAS Y SEGUIMIENTOS
            </h2>
            <div class="bitacoras-seguimientos">
              <div class="item">
                <div>
                  <p class="detail-label">N° BITACORAS</p>
                  <p class="numero">00</p>
                </div>
                <button class="btn btn-secondary">
                  <FolderIcon class="btn-icon" />
                  VER BITACORAS
                </button>
              </div>
              <div class="item">
                <div>
                  <p class="detail-label">N° SEGUIMIENTOS</p>
                  <p class="numero">00</p>
                </div>
                <button class="btn btn-secondary">
                  <FolderIcon class="btn-icon" />
                  VER SEGUIMIENTOS
                </button>
              </div>
            </div>
          </div>
  
          <!-- Certificación -->
          <div class="card">
            <h2 class="card-title">
              <AwardIcon class="icon" />
              CERTIFICACIÓN
            </h2>
            <div class="certificacion">
              <div>
                <p class="detail-label">ESTADO</p>
                <p class="estado">ESTADO APRENDIZ</p>
              </div>
              <button class="btn btn-primary">
                <FolderIcon class="btn-icon" />
                VER CERTIFICACIÓN
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Botón de Historial -->
      <div class="historial-btn">
        <button class="btn btn-primary">
          <HistoryIcon class="btn-icon" />
          Historial
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { 
    UserIcon, 
    ClipboardIcon, 
    ClipboardCheckIcon, 
    FolderIcon, 
    AwardIcon,
    HistoryIcon 
  } from 'lucide-vue-next';
  import iconSena from '@/assets/icon.png';
//   import { getData } from "../services/apiClient";
//   import { useQuasar } from "quasar";

//   let numDocument = ref("");
// let firstName = ref("");
// let lastName = ref("");
//   let ficheName = ref("");
//   let ficheNumber = ref("");
  </script>
  
  <style scoped>
  .dashboard {
    min-height: 80vh;
  }
  
  .container {
    max-width: 1000px;
    margin: 0 auto;
    margin-top: 29px;
    justify-content: center;
    align-items: center;
  }
  
  .dashboard-title {
    font-size: 1.875rem;
    font-weight: bold;
    color: #15803d;
    margin-bottom: 1.5rem;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1rem;
    width: 1000px;
  }
  
  .card {
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    padding: 1rem;
    width: 500px;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #15803d;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
  }
  
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
  
  .aprendiz-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .imgSena {
  width: 120px;
  height: 130px;
  margin-bottom: 20px;
  margin-top: 10px;
}
  
  .aprendiz-nombre {
    font-weight: 600;
  }
  
  .aprendiz-documento {
    font-size: 0.875rem;
    color: #4b5563;
  }
  
  .aprendiz-details, .fecha-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .detail-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #15803d;
    margin-bottom: 0.25rem;
  }
  
  .etapa-info > div {
    margin-bottom: 1rem;
  }
  
  .bitacoras-seguimientos .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .numero {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .btn {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  
  .btn-primary {
    background-color: #15803d;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #166534;
  }
  
  .btn-secondary {
    background-color: #dcfce7;
    color: #15803d;
  }
  
  .btn-secondary:hover {
    background-color: #bbf7d0;
  }
  
  .btn-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }
  
  .historial-btn {
    margin-top: 20px;
    display: flex;               
    justify-content: center;     
        
  }
  
  .certificacion {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .estado {
    font-size: 1.125rem;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
  </style>