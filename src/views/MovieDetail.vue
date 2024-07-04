<template>
  <section class="movie-detail">
    <div v-if="movie" class="movie-info-container">
      <img
        :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
        :alt="movie.title"
      />
      <div class="info-text">
        <h2>{{ movie.title }}</h2>
        <p class="bold">Lanzamiento: {{ movie.release_date }}</p>
        <p>{{ movie.overview }}</p>
        <button class="btn" @click="toggleFavorite">
          {{ isFavorite ? "Quitar de favoritos" : "Agregar a favoritos" }}
        </button>
      </div>
    </div>
    <div v-if="!movie" class="messages">
      <p v-if="loading">Cargando peliculas...</p>
      <p v-if="error">Algo salio mal :(</p>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movie: null,
      loading: false,
      error: false,
      isFavorite: false,
    };
  },
  mounted() {
    this.fetchData();
    this.checkFavorite();
  },
  watch: {
    movie() {
      this.checkFavorite();
    },
  },
  methods: {
    async fetchData() {
      const movieId = this.$route.params.id;
      const apiKey = "3d99b0a7bfcc1d3dc8941f2d4fa9621";
      const language = "es";
      this.loading = true;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`
        );
        response.status == 200 ? (this.movie = response.data) : null;
      } catch (e) {
        console.log("Error conectando con la API: ", e);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    checkFavorite() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const result = favorites.find(
        (favorite) => favorite.id === this.movie.id
      );
      result ? (this.isFavorite = true) : (this.isFavorite = false);
    },
    toggleFavorite() {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const index = favorites.findIndex(
        (favorite) => favorite.id === this.movie.id
      );

      if (index === -1) {
        favorites.push(this.movie);
      } else {
        favorites.splice(index, 1);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      this.isFavorite = !this.isFavorite;
    },
  },
};
</script>

<style scoped>
section.movie-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}

.movie-info-container {
  max-width: 70%;
  gap: 2rem;
  display: flex;
}

.movie-info-container img {
  object-fit: cover;
  min-width: 250px;
}

.movie-info-container .info-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: space-between;
  text-align: left;
}
.bold {
  font-weight: 600;
}

.btn {
  border-radius: 5px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

div.messages p {
  margin-top: 3rem;
  font-size: 1.75rem;
}

@media (max-width: 1024px) {
  section.movie-detail {
    padding: 1.75rem;
  }
  .movie-info-container {
    flex-direction: column;
    max-width: 100%;
    align-items: center;
  }
  .movie-info-container img {
    min-width: none;
    max-width: 200px;
  }
}
</style>
