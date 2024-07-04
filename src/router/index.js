import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MovieDetail from "../views/MovieDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie-detail",
    name: "Detalle",
    component: MovieDetail,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
