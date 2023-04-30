<template>
  <v-row class="search-bar mb-4">
    <v-col cols="12" lg="4" md="6">
      <v-text-field
        @keyup.enter="getStoreItems"
        @click:prependInner="getStoreItems"
        @click:clear="getStoreItems"
        v-model="store.search"
        prepend-inner-icon="mdi-magnify"
        :label="label"
        variant="outlined"
        clearable
        hide-details
        :bg-color="[!storeThemeSwitch.darkMode ? 'blue-grey-darken-4' : 'white']"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup>
// imports
import { useStoreThemeSwitch } from '@/stores/storeThemeSwitch';

// store
const storeThemeSwitch = useStoreThemeSwitch();

// props
const props = defineProps({
  store: {
    type: Object,
    required: true
  },
  type: {
    type: String
  },
  label: {
    type: String
  }
});

const getStoreItems = () => {
  if (props.type === 'movies') {
    props.store.page = 1;
    props.store.getMovies();
  } else if (props.type === 'people') {
    props.store.page = 1;
    props.store.getPeople();
  } else if (props.type === 'tvShows') {
    props.store.page = 1;
    props.store.getTvShows();
  }
};
</script>
