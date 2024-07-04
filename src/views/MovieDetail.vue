<template>
  <section class="movie-detail">
    <div class="movie-info-container">
      <img
        :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
        :alt="movie.title"
      />
      <div class="info-text">
        <h2>{{ movie.title }}</h2>
        <p class="bold">Lanzamiento: {{ movie.release_date }}</p>
        <p>{{ movie.overview }}</p>
        <button class="btn">Agregar a favoritas</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movie: {},
      loading: false,
      error: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: async function () {
      const movieId = this.$route.params.id;
      const apiKey = "3d99b0a7bfcc1d3dc8941f2d4fa9621c";
      const language = "es";
      this.loading = true;
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`
        );
        this.movie = data;
        console.log(data);
      } catch (e) {
        console.log("Error conectando con la API: ", e);
        this.error = true;
      } finally {
        this.loading = false;
      }
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
}

@media (max-width: 1024px) {
  section.movie-detail {
    padding: 2rem;
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
