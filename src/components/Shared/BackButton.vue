<template>
  <div class="back-button">
    <v-btn
      @click.stop="$router.back()"
      class="ma-0 mb-5"
      :class="[!storeThemeSwitch.darkMode ? 'bg-blue-grey-darken-4' : 'white']"
    >
      <v-icon start icon="mdi-arrow-left"></v-icon>
      Back
    </v-btn>
  </div>
</template>

<script setup>
// imports
import { useStoreThemeSwitch } from '@/stores/storeThemeSwitch';

// store
const storeThemeSwitch = useStoreThemeSwitch();
</script>
