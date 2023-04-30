<template>
  <RouterLink :to="`/person-detail/${cast.id}`" class="text-center text-decoration-none text-white">
    <v-avatar v-if="cast?.profile_path" size="140">
      <v-img
        cover
        :src="`https://image.tmdb.org/t/p/original/${cast?.profile_path}`"
        :lazy-src="`https://image.tmdb.org/t/p/original/${cast?.profile_path}`"
        alt="John"
      ></v-img>
    </v-avatar>
    <v-avatar v-else size="140" color="grey-darken-1"> </v-avatar>
    <p class="mt-3" :class="[!storeThemeSwitch.darkMode ? 'text-blue-grey-lighten-5' : 'text-blue-grey-darken-4']">
      {{ cast.name }}
    </p>
  </RouterLink>
</template>

<script setup>
// imports
import { RouterLink } from 'vue-router';
import { useStoreThemeSwitch } from '@/stores/storeThemeSwitch';

// store
const storeThemeSwitch = useStoreThemeSwitch();

//  props
const props = defineProps({
  cast: {
    type: Object,
    required: true
  }
});
</script>
