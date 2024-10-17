import { createApp } from 'vue'
import { createPinia } from "pinia"
import { router } from './routes/routes.js'
import { Quasar, Notify, QSelect, QInput, QIcon, QItem, QItemSection, QCard, QCardSection, QCardActions, QBtn, QDialog } from 'quasar'
import axios from 'axios'
import  PiniaVuePluginPersistedstate from 'pinia-plugin-persistedstate'

// https://asistencia-50zn.onrender.com/api
// http://localhost:5000/api
// https://asistencia-da2l.onrender.com/api

// principal
// https://asistenciaweb-ucyv.onrender.com/api

axios.defaults.baseURL = 'http://localhost:5000/api'

const pinia = createPinia()


pinia.use(PiniaVuePluginPersistedstate)

import './style.css'
import App from './App.vue'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(router)

app.use(Quasar, {
    plugins: {
        Notify
    },
    components: {
        QSelect,
        QInput,
        QIcon,
        QItem,
        QItemSection,
        QCard,
        QCardSection,
        QCardActions,
        QBtn,
        QDialog
    }
})

app.use(pinia)
app.mount('#app')