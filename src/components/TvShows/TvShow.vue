<template>
  <v-col cols="12" :lg="2" :md="3" :sm="4">
    <RouterLink :to="`/tvShow-detail/${tvShow.id}`" class="text-decoration-none">
      <v-card>
        <v-img
          v-if="props.tvShow.poster_path"
          :src="`https://image.tmdb.org/t/p/original/${props.tvShow.poster_path}`"
          :lazy-src="`https://image.tmdb.org/t/p/original/${props.tvShow.poster_path}`"
          cover
          height="100%"
          :alt="tvShow?.name"
        >
          <div class="pa-1 rounded-circle d-inline-block ml-2 mt-3 border" :class="`${voteColor}`">
            {{ tvShow?.vote_average.toFixed(1) }}
          </div>
        </v-img>

        <v-img v-else src="@/assets/noImage.png" alt="no-image"></v-img>

        <div class="pa-3" :class="[!storeThemeSwitch.darkMode ? 'bg-blue-grey-darken-4' : 'white']">
          <div class="d-flex justify-space-between subtitle-2 mb-2">
            <div>
              {{ tvShow?.release_date?.slice(0, 4) }}
            </div>
          </div>
          <div class="subtitle-1 truncate">
            {{ tvShow?.name }}
          </div>
        </div>
      </v-card>
    </RouterLink>
  </v-col>
</template>

<script setup>
// imports
import { computed } from 'vue';
import { useStoreThemeSwitch } from '@/stores/storeThemeSwitch';

// store
const storeThemeSwitch = useStoreThemeSwitch();

//  props
const props = defineProps({
  tvShow: {
    type: Object,
    required: true
  }
});

const voteColor = computed(() => {
  const vote = props.tvShow.vote_average.toFixed(1);
  if (vote >= 8.0) {
    return 'bg-green';
  } else if (vote >= 6.5) {
    return 'bg-yellow';
  } else {
    return 'bg-red';
  }
});
</script>
