<template>
  <v-col cols="12" :lg="2" :md="3" :sm="4">
    <RouterLink :to="`/person-detail/${person.id}`" class="text-decoration-none text-white">
      <v-card>
        <v-img
          v-if="person.profile_path"
          :src="`https://image.tmdb.org/t/p/original/${person.profile_path}`"
          :lazy-src="`https://image.tmdb.org/t/p/original/${person.profile_path}`"
          cover
          height="100%"
          :alt="person?.name"
        >
        </v-img>

        <v-img v-else src="@/assets/noImage.png" alt="no-image"></v-img>

        <div class="pa-3" :class="[!storeThemeSwitch.darkMode ? 'bg-blue-grey-darken-4' : 'white']">
          <div class="subtitle-1 truncate">
            {{ person?.name }}
          </div>
        </div>
      </v-card>
    </RouterLink>
  </v-col>
</template>

<script setup>
//  import
import { useStoreThemeSwitch } from '@/stores/storeThemeSwitch';

// store
const storeThemeSwitch = useStoreThemeSwitch();

// props
const props = defineProps({
  person: {
    type: Object,
    required: true
  }
});
</script>
