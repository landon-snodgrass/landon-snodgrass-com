import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faHome,
    faUser,
    faHammer,
    faEnvelope,
    faDownload,
    faFileLines,
    faDatabase,
    faCode,
} from '@fortawesome/free-solid-svg-icons';
import {
    faVuejs,
    faReact,
    faSass,
    faPython,
    faNodeJs,
    faJsSquare,
    faGithub,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
    faLinkedin
);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
