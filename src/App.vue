<template>
  <v-app :dark="false" id="inspire">
    <v-navigation-drawer v-model="drawer" :class="[!storeThemeSwitch.darkMode ? 'bg-blue-grey-darken-4' : 'white']">
      <template v-slot:prepend>
        <v-list-item lines="two" prepend-avatar="@/assets/me.png" title="Emre Süslü" subtitle="Logged in"></v-list-item>
      </template>

      <v-divider />

      <v-list class="py-0">
        <div v-for="(item, index) in items" :key="index">
          <v-list-item @click="handleClick(index)" :value="item" :to="item.to" active-color="bg-blue-grey-darken-3">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :class="[!storeThemeSwitch.darkMode ? 'bg-blue-grey-darken-4' : 'white']">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Vuetify Movie Store</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon id="mode-switcher" @click="toggleThemeMode">
        <v-icon>
          {{ !storeThemeSwitch.darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main :class="[!storeThemeSwitch.darkMode ? 'bg-blue-grey-darken-3' : 'bg-blue-grey-lighten-5']">
      <div class="pa-6">
        <RouterView :key="$route.path" />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
// imports
import { ref } from 'vue';
import { useStoreMovies } from '@/stores/storeMovies';
import { useStoreTvShows } from '@/stores/storeTvShows';
import { useStorePeople } from '@/stores/storePeople';
import { useStoreThemeSwitch } from '@/stores/storeThemeSwitch';
import { onMounted } from 'vue';

// store
const storeMovies = useStoreMovies();
const storeTvShows = useStoreTvShows();
const storePeople = useStorePeople();
const storeThemeSwitch = useStoreThemeSwitch();

const drawer = ref(null);

const items = ref([
  {
    text: 'Movies',
    icon: 'mdi-movie-open',
    to: '/',
    click() {
      storeMovies.search = '';
      storeMovies.page = 1;
      storeMovies.getMovies();
    }
  },
  {
    text: 'Tv Shows',
    icon: 'mdi-television-classic',
    to: '/tvShows',
    click() {
      storeTvShows.search = '';
      storeTvShows.page = 1;
      storeTvShows.getTvShows();
    }
  },
  {
    text: 'People',
    icon: 'mdi-account-multiple',
    to: '/people',
    click() {
      storePeople.search = '';
      storePeople.page = 1;
      storePeople.getPeople();
    }
  }
]);

const handleClick = index => {
  items.value[index].click();
};

const toggleThemeMode = () => {
  storeThemeSwitch.darkMode = !storeThemeSwitch.darkMode;
  console.log(storeThemeSwitch.darkMode);
  localStorage.setItem('darkMode', storeThemeSwitch.darkMode.toString());
};

onMounted(() => {
  storeThemeSwitch.darkMode = localStorage.getItem('darkMode') === 'true';
});
</script>

<style>
.v-toolbar-title__placeholder {
  overflow: unset !important;
  text-overflow: unset !important;
}
</style>
