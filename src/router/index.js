import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MovieDetail from "../views/MovieDetail.vue";
import Favorites from "../views/Favorites.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie-detail/:id",
    name: "Detalle",
    component: MovieDetail,
    props: true, // para poder pasar el id por params
  },
  {
    path: "/favorites",
    name: "Favoritos",
    component: Favorites,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
