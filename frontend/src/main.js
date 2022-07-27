import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '&/@fortawesome/fontawesome-svg-core';
import {
    faHome,
    faUser,
    faHammer,
    faEnvelope,
    faDownload,
    faFileLines,
    faDatabase,
    faCode,
    faMapMarkerAlt,
    faPaperPlane,
} from '&/@fortawesome/free-solid-svg-icons';
import {
    faVuejs,
    faReact,
    faSass,
    faPython,
    faNodeJs,
    faJsSquare,
    faGithub,
    faLinkedin,
} from '&/@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '&/@fortawesome/vue-fontawesome';

library.add(
    faHome,
    faUser,
    faHammer,
    faEnvelope,
    faDownload,
    faVuejs,
    faReact,
    faSass,
    faPython,
    faNodeJs,
    faJsSquare,
    faFileLines,
    faDatabase,
    faCode,
    faGithub,
    faLinkedin,
    faMapMarkerAlt,
    faPaperPlane
);

// Global components
import Blurb from './components/Blurb.vue';

import 'vue-universal-modal/dist/index.css';
import VueUniversalModal from 'vue-universal-modal';

const backendUrl = process.env.NODE_ENV != 'dev' ? '' : 'localhost:3080';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.component('blurb', Blurb);

app.use(router);

app.use(store);

app.use(VueUniversalModal, {
    teleportTarget: '#modals',
});

app.provide('backendUrl', backendUrl);

app.mount('#app');
