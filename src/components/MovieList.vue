<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      @input="searchMovies"
      placeholder="Buscar por título..."
    />

    <div>
      <label for="genreFilter">Filtrar por Género:</label>
      <select id="genreFilter" v-model="selectedGenre" @change="filterMovies">
        <option value="">Todos</option>
        <option
          v-for="genre in popularGenres"
          :value="genre.id"
          :key="genre.id"
        >
          {{ genre.name }}
        </option>
      </select>
    </div>
    <ul class="movies-grid">
      <li class="movie-item" v-for="movie in filteredMovies" :key="movie.id">
        <img
          :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
          :alt="movie.title"
        />
        <h2>{{ movie.title }}</h2>
        <router-link to="/movie-detail/">Ver</router-link>
        <p>{{ truncateOverview(movie.overview) }}</p>
        <p>{{ movie.release_date }}</p>
        <p>Puntuación: {{ movie.vote_average.toFixed(2) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieList",
  data() {
    return {
      movies: [],
      filteredMovies: [],
      searchQuery: "",
      selectedGenre: "",
      popularGenres: [
        { id: 28, name: "Acción" },
        { id: 35, name: "Comedia" },
        { id: 18, name: "Drama" },
        { id: 878, name: "Ciencia ficción" },
      ],
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      const apiKey = "3d99b0a7bfcc1d3dc8941f2d4fa9621c";
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`
        );
        this.movies = response.data.results.slice(0, 10);
        this.filteredMovies = [...this.movies];
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    truncateOverview(overview) {
      const maxLength = 50;
      if (overview.length > maxLength) {
        return overview.substring(0, maxLength) + "...";
      }
      return overview;
    },
    searchMovies() {
      if (this.searchQuery.trim() === "") {
        this.filteredMovies = [...this.movies];
      } else {
        const searchTerm = this.searchQuery.trim().toLowerCase();
        this.filteredMovies = this.movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm)
        );
      }
    },
    filterMovies() {
      let filtered = [...this.movies];

      // Filtrar por género
      if (this.selectedGenre) {
        filtered = filtered.filter((movie) =>
          movie.genre_ids.includes(parseInt(this.selectedGenre))
        );
      }

      if (this.searchQuery.toLowerCase().trim() !== "") {
        const searchTerm = this.searchQuery.trim().toLowerCase();
        filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm)
        );
      }

      this.filteredMovies = filtered;
    },
  },
};
</script>

<style scoped>
.movies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;
  padding: 0;
  justify-content: center;
  width: auto;
}

.movie-item {
  background: #270a0a;
  width: 20rem;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}

.movie-item img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.movie-item h2 {
  font-size: 18px;
  margin: 12px 0 8px;
}

.movie-item p {
  font-size: 14px;
  margin: 4px 0;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 16px;
}
</style>
