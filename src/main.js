// Components
import App from './App.vue';
import router from '@/router';

// Composables
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Plugins
import { registerPlugins } from '@/plugins';

const app = createApp(App);

registerPlugins(app);

app.use(createPinia()).use(router).mount('#app');
