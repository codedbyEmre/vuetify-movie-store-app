<template>
  <v-progress-circular
    :size="60"
    :width="5"
    :color="[!storeThemeSwitch.darkMode ? 'white' : 'blue-grey-darken-4']"
    indeterminate
  ></v-progress-circular>
</template>

<script setup>
// imports
import { useStoreThemeSwitch } from '@/stores/storeThemeSwitch';

// store
const storeThemeSwitch = useStoreThemeSwitch();
</script>
