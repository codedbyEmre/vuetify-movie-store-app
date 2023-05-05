<template>
  <div v-if="!storeLoading.loading.moviesDetail" class="mt-10 w-100 text-center">
    <Loading />
  </div>
  <div v-else class="movie-detail">
    <!-- Movie Informations -->

    <!-- Back to where you are -->
    <BackButton />

    <v-card
      min-height="500"
      class="text-white"
      :style="`background-image: url(https://image.tmdb.org/t/p/original/${storeMovies.moviesDetails.bgImage}); background-repeat: no-repeat; background-position: top center; background-size: cover;`"
    >
      <div class="pa-6 w-50 card-content">
        <div class="text-h2 font-weight-regular movie-title">{{ storeMovies.moviesDetails.title }}</div>
        <div class="mb-4 mt-6">
          <span>
            <v-icon size="20" color="yellow" icon="mdi-star" class="mr-1"></v-icon>
          </span>
          <span class="vote-average"> {{ storeMovies.moviesDetails.voteAvg.toFixed(1) }} </span>
          <span class="mx-3">|</span>
          <span class="run-time"> {{ storeMovies.moviesDetails.runTime }}m </span>
          <span class="mx-3">|</span>
          <span class="release-date"> {{ storeMovies.moviesDetails.releaseDate?.slice(0, 4) }} </span>
          <span class="ml-3">|</span>
          <v-btn
            :href="`https://www.imdb.com/title/${storeMovies.moviesDetails.imdb}/?ref_=hm_inth_tt_i_3`"
            variant="text"
            target="_blank"
            :ripple="false"
          >
            IMDB
            <v-icon class="ml-1" ripple="false" start icon="mdi-open-in-new"></v-icon>
          </v-btn>
        </div>
        <v-chip v-for="genre in storeMovies.moviesDetails.genres" :key="genre" class="mr-2 mb-4" color="white">
          {{ genre.name }}
        </v-chip>
        <div class="overview text-body-1 font-weight-normal">{{ storeMovies.moviesDetails.overview }}</div>
        <div v-if="storeMovies.directors" class="text-body-1 mt-5">
          Director(s):
          <span class="font-weight-bold">
            {{ storeMovies.directors }}
          </span>
        </div>
        <div v-if="storeMovies.producers" class="text-body-1 my-2">
          Producer(s):
          <span class="font-weight-bold">
            {{ storeMovies.producers }}
          </span>
        </div>
        <div v-if="storeMovies.writers" class="text-body-1 my-2">
          Writer(s):
          <span class="font-weight-bold">
            {{ storeMovies.writers }}
          </span>
        </div>
      </div>
    </v-card>

    <!-- Recommended Movies -->
    <div v-if="storeMovies.recommendedMovies && storeMovies.recommendedMovies.length" class="recommended mt-8">
      <h2 class="mb-4">Recommended Movies</h2>
      <v-row class="recommended-container">
        <v-col v-for="recommended in storeMovies.recommendedMovies?.slice(0, 6)" cols="12" :lg="2" :md="4" :sm="6">
          <RecommendedMovies :recommended="recommended" />
        </v-col>
      </v-row>
    </div>

    <!-- Cast -->
    <div v-if="storeMovies.movieCast && storeMovies.movieCast.length" class="cast mt-8">
      <h2 class="mb-4">Movie Cast</h2>
      <div class="d-flex flex-wrap cast-container">
        <div v-for="cast in storeMovies.movieCast?.slice(0, 20)" class="mr-6 mb-6 single-cast">
          <MovieCast :cast="cast" />
        </div>
      </div>
    </div>

    <!-- Trailers & Videos -->
    <div v-if="storeMovies.movieVideos && storeMovies.movieVideos.length" class="trailers mt-8">
      <h2 class="mb-4">Trailers & Videos</h2>
      <div class="d-flex flex-wrap video-wrapper">
        <div v-for="video in storeMovies.movieVideos?.slice(0, 6)" :key="video.id" class="mr-6 mb-6">
          <MovieTrailersAndVideos :video="video" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import { useRoute } from 'vue-router';
import { useStoreMovies } from '@/stores/storeMovies';
import { useStoreLoading } from '@/stores/storeLoading';
import BackButton from '@/components/Shared/BackButton.vue';
import Loading from '@/components/Shared/Loading.vue';
import RecommendedMovies from '@/components/Movies/MovieDetails/RecommendedMovies.vue';
import MovieCast from '@/components/Movies/MovieDetails/MovieCast.vue';
import MovieTrailersAndVideos from '@/components/Movies/MovieDetails/MovieTrailersAndVideos.vue';

// store
const storeMovies = useStoreMovies();
const storeLoading = useStoreLoading();

// router
const route = useRoute();

storeMovies.getMovieDetail(route.params.id);
// storeMovies.getRecommendedMovies(route.params.id);
// storeMovies.getCastAndCrewByMovie(route.params.id);
// storeMovies.getVideosByMovie(route.params.id);
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

.v-btn {
  cursor: pointer !important;
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
