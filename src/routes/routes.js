import Apprentice from '../views/Apprentice.vue';
import Assignment from '../views/Assignment.vue';
import Binnacle from '../views/Binnacle.vue';
import Followup from '../views/Followup.vue';
import ForgottenPassword from '../views/ForgottenPassword.vue';
import Home from '../views/Home.vue';
import Log from '../views/Log.vue';
import Login from '../views/Login.vue';
import Modality from '../views/Modality.vue';
import Register from '../views/Register.vue';
import RessetPassword from '../views/ResetPassword.vue';
import Menu from '../layouts/menu.vue'
import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
    {
        path: '/menu', component: Menu, children: [
            { path: '/home', component: Home },
            { path: '/apprentice', component: Apprentice },
            { path: '/assignment', component: Assignment },
            { path: '/binnacle', component: Binnacle },
            { path: '/followup', component: Followup },
            { path: '/modality', component: Modality },
            { path: '/log', component: Log }
        ]
    },
    { path: '/', component: Login },
    { path: '/forgotten-password', component: ForgottenPassword },
    { path: '/reset-password', component: RessetPassword },
    { path: '/register', component: Register }

];

export const router = createRouter({
    // actualizar a futuro a createWebHistoy()
    history: createWebHashHistory(),
    routes
});