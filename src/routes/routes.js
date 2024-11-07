import { useAuthStore } from '../stores/authStore.js';
import { createRouter, createWebHashHistory } from 'vue-router';
import Apprentice from '../views/Apprentice.vue';
import Assignment from '../views/Assignment.vue';
import Binnacle from '../views/Binnacle.vue';
import ForgottenPassword from '../views/ForgottenPassword.vue';
import Home from '../views/Home.vue';
import HomeInstructor from '../views/HomeInstructor.vue';
import Log from '../views/Log.vue';
import Login from '../views/Login.vue';
import Modality from '../views/Modality.vue';
import Register from '../views/Register.vue';
import RessetPassword from '../views/ResetPassword.vue';
import Menu from '../layouts/menu.vue'
import Fiches from '../views/Fiches.vue'
import Report from '../views/Report.vue'
import Followup from '../views/Followup.vue';
import Consultant from '../views/Consultant.vue'
import RecordHours from '../views/recordHours.vue';
import AssignmentInstructor from '../views/AssignmentInstructor.vue';

//report y followup corregir 

const routes = [
    {
        path: '/menu', component: Menu, children: [
            { path: '/home', component: Home, meta: { requiresAuth: true, role: 'ADMINISTRADOR' } },
            { path: '/homeInstructor', component: HomeInstructor, meta: { requiresAuth: true, role: 'INSTRUCTOR' } },
            { path: '/assigmentInstructor', component: AssignmentInstructor, meta: { requiresAuth: true, role: 'INSTRUCTOR' } },
            { path: '/apprentice', component: Apprentice, meta: { requiresAuth: true,  role: 'ADMINISTRADOR' } },
            { path: '/fiches', component: Fiches, meta: { requiresAuth: true, role: 'ADMINISTRADOR' } },
            { path: '/assignment', component: Assignment, meta: { requiresAuth: true, role: 'ADMINISTRADOR' } },
            { path: '/binnacle', component: Binnacle, meta: { requiresAuth: true, roles: ['ADMINISTRADOR', 'INSTRUCTOR'] } },
            { path: '/modality', component: Modality, meta: { requiresAuth: true, role: 'ADMINISTRADOR' } },
            { path: '/report', component: Report, meta: { requiresAuth: true, role: 'ADMINISTRADOR' } },
            { path: '/followup', component: Followup, meta: { requiresAuth: true, role: 'ADMINISTRADOR' } },
            { path: '/log', component: Log, meta: { requiresAuth: true, role: 'ADMINISTRADOR' } },
            { path: '/recordHours', component: RecordHours, meta: { requiresAuth: true, role: 'INSTRUCTOR' } }
        ]
    },
    { path: '/', component: Login },
    { path: '/forgotten-password', component: ForgottenPassword },
    { path: '/reset-password', component: RessetPassword },
    { path: '/register', component: Register },
    { path: '/consultant', component: Consultant, meta: { requiresAuth: true, role: 'CONSULTOR' } }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Middleware para verificar autenticación y roles
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
  
    if (to.meta.requiresAuth) {
        const user = authStore.getUserDetails()
        const userRole = user?.role || ''
      
        // Verifica si el rol del usuario está en la lista de roles permitidos
        if (to.meta.roles && !to.meta.roles.includes(userRole)) {
            return next('/')
        }

        // Si la ruta requiere un rol específico y el usuario no lo tiene, redirige
        if (to.meta.role && to.meta.role !== userRole) {
            return next('/')
        }

        // Si el usuario no tiene un token, redirige a login
        if (!authStore.getToken()) {
            return next('/')
        }
    }
  
    next()
})

export { router }