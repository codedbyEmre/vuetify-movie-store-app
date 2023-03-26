import { defineStore } from 'pinia';

export const useStoreLoading = defineStore('storeLoading', {
  state: () => {
    return {
      loading: {
        movies: false,
        moviesDetail: false,
        people: false,
        personDetail: false,
        tvShows: false,
        tvShowDetail: false
      }
    };
  },
  actions: {}
});
