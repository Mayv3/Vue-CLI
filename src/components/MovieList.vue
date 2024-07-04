<template>
  <div class="container">
    <input
      type="text"
      v-model="searchQuery"
      @input="searchMovies"
      placeholder="Buscar por título..."
    />
    <div v-if="showGenreFilter" class="filters">
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
    <ul class="movies-grid" v-if="!loading && filteredMovies">
      <MovieItem v-for="movie in filteredMovies" :movie="movie" />
    </ul>
    <div v-else class="loader">
      <p v-if="loading">Cargando peliculas...</p>
      <p v-if="!filteredMovies">No hay resultados</p>
    </div>
  </div>
</template>

<script>
import MovieItem from "./MovieItem.vue";

export default {
  name: "MovieList",
  components: {
    MovieItem,
  },
  props: {
    movies: {
      type: Array,
    },
    loading: {
      type: Boolean,
    },
    showGenreFilter: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      filteredMovies: [...this.movies],
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

  //el watch es para que se actualice la data cuando se completa el fetch
  watch: {
    movies(newMovies) {
      this.filteredMovies = [...newMovies];
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
    searchMovies() {
      if (this.searchQuery.trim() === "") {
        this.filteredMovies = [...this.movies];
      } else {
        const searchTerm = this.searchQuery.trim().toLowerCase();
        const result = this.movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm)
        );
        //si tiene datos el array lo setea, sino lo deja en null
        // asi evitamos tener que estar usando array.length todo el tiempo
        result.length > 0
          ? (this.filteredMovies = result)
          : (this.filteredMovies = null);
      }
    },
    filterMovies() {
      let filtered = [...this.movies];

      // Filtrar por genero
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
.container {
  width: 80%;
  max-width: 1300px;
  margin: 0px auto;
}
.movies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 2rem;
  list-style: none;
  padding: 0;
  justify-content: center;
  width: 100%;
  margin: 40px auto;
}

input[type="text"] {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
}
div.loader {
  margin-top: 3rem;
}

div.loader p {
  font-size: 3rem;
}
.filters {
  display: flex;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0px auto;
}
.filters label {
  font-size: 20px;
}
.filters select {
  width: 40%;
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;

  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
}
select option {
  font-size: 20px;
  color: #333;
  padding: 10px;
}

input {
  width: 100% !important;
  margin: 1rem 0rem;
}
#genreFilter {
  margin: 1rem 0rem;
  width: 100% !important;
}

@media (max-width: 768px) {
  .container {
    width: 95%;
  }
  .movies-grid {
    grid-template-columns: 1fr;
    width: 90%;
    gap: 30px;
  }

  input[type="text"],
  #genreFilter {
    width: 100%;
  }
  .btn {
    font-size: 16px;
    height: 60px;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    width: 95%;
  }
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
  }

  input[type="text"],
  #genreFilter {
    width: 100%;
  }
  .btn {
    font-size: 16px;
    height: 60px;
  }
}
</style>
