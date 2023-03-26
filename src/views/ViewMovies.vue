<template>
  <div class="movies">
    <!-- Search movies -->
    <SearchBar :store="storeMovies" type="movies" label="Search movie..." />

    <!-- Movies grid -->
    <v-row class="mt-0">
      <div v-if="!storeLoading.loading.movies" class="mt-10 w-100 text-center">
        <Loading />
      </div>
      <template v-else>
        <Movie v-for="movie in storeMovies.movies" :key="movie.id" :movie="movie" />

        <!-- If there is no movie found -->
        <div v-if="!storeMovies.movies.length" class="w-100 text-center text-h5 mt-5">No movie found...</div>
      </template>
    </v-row>

    <!-- Pagination -->
    <div v-if="storeMovies.movies.length" class="text-center mt-5">
      <Pagination :store="storeMovies" type="movies" />
    </div>
  </div>
</template>

<script setup>
// imports
import { onMounted } from 'vue';
import Movie from '@/components/Movies/Movie.vue';
import Loading from '@/components/Shared/Loading.vue';
import SearchBar from '@/components/Shared/SearchBar.vue';
import Pagination from '@/components/Shared/Pagination.vue';
import { useStoreMovies } from '@/stores/storeMovies';
import { useStoreLoading } from '@/stores/storeLoading';

// store
const storeMovies = useStoreMovies();
const storeLoading = useStoreLoading();

onMounted(() => {
  storeMovies.getMovies(storeMovies.page);
});
</script>

<style>
.v-card {
  cursor: pointer;
}
.v-card img {
  overflow: hidden;
  transition: 0.3s ease all;
}
.v-card:hover img {
  transform: scale(1.15);
}
.truncate {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
