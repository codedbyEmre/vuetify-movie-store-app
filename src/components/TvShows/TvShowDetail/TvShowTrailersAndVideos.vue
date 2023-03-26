<template>
  <iframe
    class="video"
    width="400"
    height="250"
    :src="`https://www.youtube.com/embed/${video.key}`"
    allow="fullscreen;"
  >
  </iframe>
</template>

<script setup>
//  props
const props = defineProps({
  video: {
    type: Object,
    required: true
  }
});
</script>
