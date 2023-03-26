<template>
  <v-container class="pagination">
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
            @click="changePage"
            v-model="store.page"
            :length="store.totalPages"
            color="bg-blue-grey-darken-4"
            class="my-4"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// props
const props = defineProps({
  store: {
    type: Object,
    required: true
  },
  type: {
    type: String
  }
});

const changePage = () => {
  if (props.type === 'movies') {
    props.store.getMovies(props.store.page);
  } else if (props.type === 'people') {
    props.store.getPeople(props.store.page);
  } else if (props.type === 'tvShows') {
    props.store.getTvShows(props.store.page);
  }
};
</script>
