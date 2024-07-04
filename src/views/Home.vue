<template>
  <section class="home">
    <h1>Peliculas populares</h1>

    <MovieList v-if="!error" :movies="movies" :loading="loading" />
    <div class="error" v-else>
      <p>Parece que nuestro servidor esta teniendo problemas :(</p>
    </div>
  </section>
</template>

<script>
// imports
import MovieList from "../components/MovieList.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    MovieList,
  },
  data() {
    return {
      loading: false,
      error: false,
      movies: [], // es la lista original
      filteredMovies: [], //es la lista para filtrar
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      const apiKey = "3d99b0a7bfcc1d3dc8941f2d4fa9621c";
      this.loading = true;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`
        );
        this.movies = response.data.results.slice(0, 10);
        this.filteredMovies = [...this.movies];
      } catch (e) {
        console.log("Error conectando al servidor:", e);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.home {
  padding-top: 4rem;
}
div.error {
  margin-top: 3rem;
}
div.error p {
  font-size: 2rem;
}
</style>
