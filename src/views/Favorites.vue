<template>
  <div class="favorites-container">
    <h1>Películas Favoritas</h1>
    <MovieList
      v-if="favoriteMovies"
      :showGenreFilter="false"
      :movies="favoriteMovies"
      :loading="loading"
    />
    <div class="error" v-else>
      <h2>No haz guardado nada aun</h2>
      <router-link class="btn-link" to="/">Buscar peliculas</router-link>
    </div>
  </div>
</template>

<script>
import MovieList from "../components/MovieList.vue";

export default {
  name: "Favorites",
  components: {
    MovieList,
  },
  data() {
    return {
      favoriteMovies: null,
      loading: false,
      movies: [],
      filteredMovies: [],
      searchQuery: "",
    };
  },
  mounted() {
    this.loadFavorites();
  },
  methods: {
    loadFavorites() {
      this.loading = true;
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites[0] ? (this.favoriteMovies = favorites) : null;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.favorites-container {
  padding: 20px;
}
div.error {
  margin-top: 4rem;
}
h2 {
  margin-bottom: 3rem;
}
.btn-link {
  background-color: red;
  color: white;
  padding: 1rem 2rem;
}
</style>
