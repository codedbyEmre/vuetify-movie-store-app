<template>
  <div class="tv-shows">
    <!-- Search tv shows -->
    <SearchBar :store="storeTvShows" type="tvShows" label="Search tv show..." />

    <!-- Tv Shows grid -->
    <v-row class="mt-0">
      <div v-if="!storeLoading.loading.tvShows" class="mt-10 w-100 text-center">
        <Loading />
      </div>
      <template v-else>
        <TvShow v-for="tvShow in storeTvShows.tvShows" :key="tvShow.id" :tvShow="tvShow" />

        <!-- If there is no tv Shows found -->
        <div v-if="!storeTvShows.tvShows.length" class="w-100 text-center text-h5 mt-5">No tv shows found...</div>
      </template>
    </v-row>

    <!-- Pagination -->
    <div v-if="storeTvShows.tvShows.length" class="text-center mt-5">
      <Pagination :store="storeTvShows" type="tvShows" />
    </div>
  </div>
</template>

<script setup>
// imports
import { onMounted } from 'vue';
import { useStoreTvShows } from '@/stores/storeTvShows';
import { useStoreLoading } from '@/stores/storeLoading';
import Loading from '@/components/Shared/Loading.vue';
import SearchBar from '@/components/Shared/SearchBar.vue';
import Pagination from '@/components/Shared/Pagination.vue';
import TvShow from '@/components/TvShows/TvShow.vue';

// store
const storeTvShows = useStoreTvShows();
const storeLoading = useStoreLoading();

onMounted(() => {
  storeTvShows.getTvShows(storeTvShows.page);
});
</script>
