import { createRouter, createWebHistory } from 'vue-router'
import ModelsListView from "../views/ModelsListView.vue";
import ModelDetailsView from "../views/ModelDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ModelsListView",
      component: ModelsListView,
    },
    {
      path: "/model/:id",
      name: "model-details",
      props: true,
      component: ModelDetailsView,
    },
  ],
})

export default router
