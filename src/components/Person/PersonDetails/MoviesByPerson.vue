<template>
  <RouterLink :to="`/movie-detail/${movie.id}`" class="text-decoration-none">
    <v-card>
      <v-img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
        :lazy-src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
        cover
        height="100%"
        :alt="movie?.title"
      >
        <div class="pa-1 rounded-circle d-inline-block ml-2 mt-3 border" :class="`${voteColor}`">
          {{ movie?.vote_average.toFixed(1) }}
        </div>
      </v-img>

      <v-img v-else src="@/assets/noImage.png" alt="no-image"></v-img>

      <div class="pa-3" :class="[!storeThemeSwitch.darkMode ? 'bg-blue-grey-darken-4' : 'white']">
        <div class="d-flex justify-space-between subtitle-2 mb-2">
          <div>
            {{ movie?.release_date?.slice(0, 4) }}
          </div>
        </div>
        <div class="subtitle-1 truncate">
          {{ movie?.title }}
        </div>
      </div>
    </v-card>
  </RouterLink>
</template>

<script setup>
// imports
import { computed } from 'vue';
import { useStoreThemeSwitch } from '@/stores/storeThemeSwitch';

// store
const storeThemeSwitch = useStoreThemeSwitch();

//  props
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const voteColor = computed(() => {
  const vote = props.movie.vote_average.toFixed(1);
  if (vote >= 8.0) {
    return 'bg-green';
  } else if (vote >= 6.5) {
    return 'bg-yellow';
  } else {
    return 'bg-red';
  }
});
</script>
