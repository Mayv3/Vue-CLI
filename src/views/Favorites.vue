<template>
    <div class="favorites-container">
      <h1>Películas Favoritas</h1>
      <MovieList :movies="favoriteMovies" :loading="loading" />
    </div>
  </template>
  
  <script>
  import MovieList from '../components/MovieList.vue';
  
  export default {
    name: 'Favorites',
    components: {
      MovieList,
    },
    data() {
      return {
        favoriteMovies: [],
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
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.favoriteMovies = favorites;
        this.loading = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .favorites-container {
    padding: 20px;
  }
  </style>
  