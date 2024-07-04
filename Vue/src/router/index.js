import Vue from "vue";
import VueRouter from "vue-router";
import MovieList from "src/components/MovieList.vue";
import MovieList from "src/components/MovieDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/movies",
    name: "Movies",
    component: MovieList,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
