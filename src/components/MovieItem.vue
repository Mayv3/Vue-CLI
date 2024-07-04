<template>
  <li class="movie-item">
    <img
      :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
      :alt="movie.title"
    />
    <h2>{{ movie.title }}</h2>
    <p>{{ truncateOverview(movie.overview) }}</p>
    <p>Puntuación: {{ movie.vote_average.toFixed(2) }}</p>
    <p class="date">{{ movie.release_date }}</p>
    <router-link :to="'/movie-detail/' + movie.id" class="btn"
      >Ver más</router-link
    >
  </li>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    truncateOverview(overview) {
      const maxLength = 50;
      if (overview.length > maxLength) {
        return overview.substring(0, maxLength) + "...";
      }
      return overview;
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para el componente movieItem */
.movie-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #333;
  color: white;
  border-radius: 20px;
  width: 90%;
  margin: 0 auto;
}

.movie-item img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.movie-item h2 {
  font-size: 2rem;
  min-height: 100px;
  margin: 12px 0 8px;
}

.movie-item p {
  padding: 0 1rem;
  font-size: 16px;
  margin: 4px 0;
  min-height: 50px;
}

.movie-item .date {
  font-size: 1.3rem;
  margin: 4px 0;
}
</style>
