<template>
  <v-card class="person-gallery">
    <v-img
      v-if="image.file_path"
      :src="`https://image.tmdb.org/t/p/original/${image.file_path}`"
      :lazy-src="`https://image.tmdb.org/t/p/original/${image.file_path}`"
      cover
      height="100%"
      :alt="image?.file_path"
    >
    </v-img>

    <v-img v-else src="@/assets/noImage.png" alt="no-image"></v-img>
  </v-card>
</template>

<script setup>
//  props
const props = defineProps({
  image: {
    type: Object,
    required: true
  }
});
</script>

<style>
.person-gallery {
  cursor: default !important;
}

.person-gallery:hover img {
  transform: scale(1) !important;
}
</style>
