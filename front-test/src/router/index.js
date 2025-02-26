import BoardCreate from "@/components/BoardCreate.vue";
import BoardDetail from "@/components/BoardDetail.vue";
import Home from "@/components/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    { path: "/board/:idx", component: BoardDetail, props: true },
    { path: "/create", component: BoardCreate },
  ],
});

export default router;
