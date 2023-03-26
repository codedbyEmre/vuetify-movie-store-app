<template>
  <div v-if="!storeLoading.loading.tvShowDetail" class="mt-10 w-100 text-center">
    <Loading />
  </div>
  <div v-else class="tv-show-detail">
    <!-- Back to where you are -->
    <BackButton />

    <v-card
      min-height="500"
      class="text-white"
      :style="`background-image: url(https://image.tmdb.org/t/p/original/${storeTvShows.tvShowDetails.bgImage}); background-repeat: no-repeat; background-position: top center; background-size: cover;`"
    >
      <div class="pa-6 w-50 card-content">
        <div class="text-h2 font-weight-regular movie-title">{{ storeTvShows.tvShowDetails.title }}</div>
        <div class="mb-4 mt-6">
          <span>
            <v-icon size="20" color="yellow" icon="mdi-star" class="mr-1"></v-icon>
          </span>
          <span class="vote-average"> {{ storeTvShows.tvShowDetails.voteAvg?.toFixed(1) }} </span>
          <span class="mx-3">|</span>
          <span class="air-dates">
            {{ storeTvShows.tvShowDetails.firstAirDate }} - {{ storeTvShows.tvShowDetails.lastAirDate }}</span
          >
          <span class="mx-3">|</span>
          <span class="number-of-seasons"> {{ formatSeasons }} </span>
          <span class="mx-3">|</span>
          <span class="number-of-episodes"> {{ formatEpisodes }} </span>
        </div>
        <v-chip v-for="genre in storeTvShows.tvShowDetails.genres" :key="genre" class="mr-2 mb-4" color="white">
          {{ genre.name }}
        </v-chip>
        <div class="overview text-body-1 font-weight-normal mt-5">{{ storeTvShows.tvShowDetails.overview }}</div>
        <div v-if="storeTvShows.directors" class="text-body-1 mt-5">
          Director(s):
          <span class="font-weight-bold">
            {{ storeTvShows.directors }}
          </span>
        </div>
        <div v-if="storeTvShows.producers" class="text-body-1 my-2">
          Producer(s):
          <span class="font-weight-bold">
            {{ storeTvShows.producers }}
          </span>
        </div>
        <div v-if="storeTvShows.executive_producer" class="text-body-1 my-2">
          Executive Producer(s):
          <span class="font-weight-bold">
            {{ storeTvShows.executive_producer }}
          </span>
        </div>
      </div>
    </v-card>

    <!-- Recommended Tv Shows -->
    <div v-if="storeTvShows.recommendedTvShows && storeTvShows.recommendedTvShows.length" class="recommended mt-8">
      <h2 class="mb-4">Recommended Tv Shows</h2>
      <v-row class="recommended-container">
        <v-col v-for="recommended in storeTvShows.recommendedTvShows?.slice(0, 6)" cols="12" :lg="2" :md="4" :sm="6">
          <RecommendedTvShows :recommended="recommended" />
        </v-col>
      </v-row>
    </div>

    <!-- Cast -->
    <div v-if="storeTvShows.tvShowCast && storeTvShows.tvShowCast.length" class="cast mt-8">
      <h2 class="mb-4">Tv Show Cast</h2>
      <div class="d-flex flex-wrap cast-container">
        <div v-for="cast in storeTvShows.tvShowCast?.slice(0, 20)" class="mr-6 mb-6 single-cast">
          <TvShowCast :cast="cast" />
        </div>
      </div>
    </div>

    <!-- Trailers & Videos -->
    <div v-if="storeTvShows.tvShowVideos && storeTvShows.tvShowVideos.length" class="trailers mt-8">
      <h2 class="mb-4">Trailers & Videos</h2>
      <div class="d-flex flex-wrap video-wrapper">
        <div v-for="video in storeTvShows.tvShowVideos?.slice(0, 6)" :key="video.id" class="mr-6 mb-6">
          <TvShowTrailersAndVideos :video="video" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//  imports
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreTvShows } from '@/stores/storeTvShows';
import { useStoreLoading } from '@/stores/storeLoading';
import BackButton from '@/components/Shared/BackButton.vue';
import Loading from '@/components/Shared/Loading.vue';
import RecommendedTvShows from '@/components/TvShows/TvShowDetail/RecommendedTvShows.vue';
import TvShowCast from '@/components/TvShows/TvShowDetail/TvShowCast.vue';
import TvShowTrailersAndVideos from '@/components/TvShows/TvShowDetail/TvShowTrailersAndVideos.vue';

// store
const storeTvShows = useStoreTvShows();
const storeLoading = useStoreLoading();

// router
const route = useRoute();

storeTvShows.getTvShowDetail(route.params.id);
storeTvShows.getRecommendedTvShows(route.params.id);
storeTvShows.getCastAndCrewByTvShow(route.params.id);
storeTvShows.getVideosByTvShow(route.params.id);

const formatSeasons = computed(() => {
  const length = storeTvShows.tvShowDetails.seasons;
  const text = length > 1 ? 'seasons' : 'season';
  return `${storeTvShows.tvShowDetails.seasons} ${text}`;
});

const formatEpisodes = computed(() => {
  const length = storeTvShows.tvShowDetails.episodes;
  const text = length > 1 ? 'episodes' : 'episode';
  return `${storeTvShows.tvShowDetails.episodes} ${text}`;
});
</script>

<style scoped>
.v-card {
  cursor: default !important;
}
.v-card * {
  position: relative;
  z-index: 1 !important;
}

.v-card::after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to left top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.96));
}

.overview {
  line-height: 1.75 !important;
  font-size: 1.15rem !important;
}

.single-cast {
  transform: translateY(0);
  transition: 0.25s ease all;
}

.single-cast:hover {
  transform: translateY(-0.7rem);
}

@media (max-width: 64rem) {
  .card-content {
    width: 75% !important;
  }
}

@media (max-width: 48rem) {
  .card-content {
    width: 100% !important;
  }

  .card-content .movie-title {
    font-size: 2.5rem !important;
  }
}

@media (max-width: 30rem) {
  .recommended,
  .cast,
  .trailers {
    text-align: center;
  }
  .video-wrapper {
    display: block !important;
  }
  .video {
    width: 100% !important;
  }

  .cast-container {
    justify-content: center !important;
  }
}
</style>
