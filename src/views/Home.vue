<template>
  <section class="home">
    <h1>Peliculas populares</h1>
    <MovieList />
  </section>
</template>

<script>
// imports
import MovieList from "../components/MovieList.vue";

export default {
  name: "Home",
  components: {
    MovieList,
  },
};
</script>
