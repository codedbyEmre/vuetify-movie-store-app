<template>
  <div v-if="!storeLoading.loading.personDetail" class="mt-10 w-100 text-center">
    <Loading />
  </div>
  <div v-else class="person-detail">
    <!-- Back to where you are -->
    <BackButton />

    <v-card
      min-height="300"
      class="person-detail-card"
      :class="[!storeThemeSwitch.darkMode ? 'bg-blue-grey-darken-4' : 'white']"
    >
      <div class="pa-6 card-content">
        <div class="d-flex flex-sm-row flex-column mb-8">
          <v-avatar v-if="storePeople.person.profile_path" size="220" rounded>
            <v-img
              cover
              :src="`https://image.tmdb.org/t/p/original/${storePeople.person.profile_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/original/${storePeople.person.profile_path}`"
              :alt="storePeople?.person.name"
            ></v-img>
          </v-avatar>
          <v-avatar v-else color="grey-darken-1" size="220" rounded> </v-avatar>
          <div class="ml-sm-8 ml-0 mt-sm-0 mt-6">
            <div class="mb-1 info">
              <span :class="[!storeThemeSwitch.darkMode ? 'text-blue-grey-lighten-4' : 'text-blue-grey-darken-4']"
                >Name:
              </span>
              <span class="font-weight-bold">{{ storePeople.person.name ?? 'Unspecified' }}</span>
            </div>
            <p class="mb-1 info">
              <span :class="[!storeThemeSwitch.darkMode ? 'text-blue-grey-lighten-4' : 'text-blue-grey-darken-4']"
                >Date of Birth:
              </span>
              <span class="font-weight-bold">{{ storePeople.person.birthday ?? 'Unspecified' }}</span>
            </p>
            <p class="mb-1 info">
              <span :class="[!storeThemeSwitch.darkMode ? 'text-blue-grey-lighten-4' : 'text-blue-grey-darken-4']"
                >Place of Birth:
              </span>
              <span class="font-weight-bold">{{ storePeople.person.place_of_birth ?? 'Unspecified' }}</span>
            </p>
            <p class="mb-1 info">
              <span :class="[!storeThemeSwitch.darkMode ? 'text-blue-grey-lighten-4' : 'text-blue-grey-darken-4']"
                >Job:
              </span>
              <span class="font-weight-bold">{{ storePeople.person.known_for_department ?? 'Unspecified' }}</span>
            </p>
            <p class="info mb-1">
              <span :class="[!storeThemeSwitch.darkMode ? 'text-blue-grey-lighten-4' : 'text-blue-grey-darken-4']"
                >Gender:
              </span>
              <span class="font-weight-bold">{{ getGender }}</span>
            </p>
            <v-btn
              v-if="storePeople.person.imdb_id"
              :href="`https://www.imdb.com/name/${storePeople.person.imdb_id}`"
              class="pl-0 info"
              :class="[!storeThemeSwitch.darkMode ? 'text-blue-grey-lighten-4' : 'text-blue-grey-darken-4']"
              variant="text"
              target="_blank"
              :ripple="false"
            >
              IMDB
              <v-icon
                :color="[!storeThemeSwitch.darkMode ? 'white' : 'blue-grey-darken-4']"
                class="ml-1"
                ripple="false"
                start
                icon="mdi-open-in-new"
              ></v-icon>
            </v-btn>
          </div>
        </div>
        <div v-if="storePeople.person.biography" class="person-biography">
          <h1 class="mb-1">Biography</h1>
          <p :class="[!storeThemeSwitch.darkMode ? 'text-blue-grey-lighten-4' : 'text-blue-grey-darken-4']">
            {{ storePeople.person.biography }}
          </p>
        </div>
      </div>
    </v-card>

    <!-- Movies by Person -->
    <div v-if="storeMovies.moviesByPerson && storeMovies.moviesByPerson.length" class="movies-by-person mt-8">
      <h2 class="mb-4">Movies</h2>
      <v-row class="movies-by-person-container">
        <v-col v-for="movie in storeMovies.moviesByPerson.slice(0, 18)" :key="movie" cols="12" :lg="2" :md="4" :sm="6">
          <MoviesByPerson :movie="movie" />
        </v-col>
      </v-row>
    </div>

    <!-- Tv Shows by Person -->
    <div v-if="storePeople.tvShowsByPerson && storePeople.tvShowsByPerson.length" class="movies-by-person mt-8">
      <h2 class="mb-4">Tv Shows</h2>
      <v-row class="movies-by-person-container">
        <v-col
          v-for="tvShow in storePeople.tvShowsByPerson.slice(0, 18)"
          :key="tvShow"
          cols="12"
          :lg="2"
          :md="4"
          :sm="6"
        >
          <TvShowsByPerson :tvShow="tvShow" />
        </v-col>
      </v-row>
    </div>

    <!-- Gallery -->
    <div v-if="storePeople.personImages && storePeople.personImages.length" class="movies-by-person mt-8">
      <h2 class="mb-4">Gallery</h2>
      <v-row class="movies-by-person-container">
        <v-col v-for="image in storePeople.personImages?.slice(0, 12)" :key="image" cols="12" :lg="2" :md="4" :sm="6">
          <PersonGallery :image="image" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
// imports
import { computed } from 'vue';
import { useStorePeople } from '@/stores/storePeople';
import { useStoreMovies } from '@/stores/storeMovies';
import { useStoreLoading } from '@/stores/storeLoading';
import { useStoreThemeSwitch } from '@/stores/storeThemeSwitch';
import { useRoute } from 'vue-router';
import BackButton from '@/components/Shared/BackButton.vue';
import Loading from '@/components/Shared/Loading.vue';
import MoviesByPerson from '@/components/Person/PersonDetails/MoviesByPerson.vue';
import PersonGallery from '@/components/Person/PersonDetails/PersonGallery.vue';
import TvShowsByPerson from '@/components/Person/PersonDetails/TvShowsByPerson.vue';

// store
const storePeople = useStorePeople();
const storeMovies = useStoreMovies();
const storeLoading = useStoreLoading();
const storeThemeSwitch = useStoreThemeSwitch();

// router
const route = useRoute();

storePeople.getPersonDetail(route.params.id);
storeMovies.getMoviesByPerson(route.params.id);
storePeople.getPersonImages(route.params.id);
storePeople.getTvShowsByPerson(route.params.id);

const getGender = computed(() => {
  if (storePeople.person.gender === 1) return 'Woman';
  else if (storePeople.person.gender === 2) return 'Man';
  return 'Unspecified ';
});
</script>

<style>
.person-detail-card {
  cursor: default !important;
}

.info {
  font-size: 1.25rem;
}

.person-biography p {
  line-height: 1.75;
  font-size: 1.1rem;
}

.person-detail-card:hover img {
  transform: scale(1);
}

@media (max-width: 30rem) {
  .info {
    font-size: 1.1rem;
  }
}
</style>
