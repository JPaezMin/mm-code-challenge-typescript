import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@/assets/styles/index.scss";
import TheScrollToTop from "./components/TheScrollToTop.vue";
const app = createApp(App).component("scroll-to-top", TheScrollToTop);
app.use(router);
app.mount("#app");
