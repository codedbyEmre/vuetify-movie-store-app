import { defineStore } from 'pinia';
import { useStoreLoading } from '@/stores/storeLoading';

let storeLoading;

const apiKey = import.meta.env.VITE_API_KEY;
let movieBaseUrl = 'https://api.themoviedb.org/3/';

export const useStorePeople = defineStore('storePeople', {
  state: () => {
    return {
      search: '',
      people: [],
      person: {},
      personImages: [],
      tvShowsByPerson: [],
      page: 1,
      totalPages: 0
    };
  },
  actions: {
    async getPeople(page = 1) {
      storeLoading = useStoreLoading();
      storeLoading.loading.people = false;
      this.people = [];

      let url = `${movieBaseUrl}/person/popular?api_key=${apiKey}&language=en-US&include_adult=false&page=${page}`;

      if (this.search) {
        url = `${movieBaseUrl}search/person?api_key=${apiKey}&query=${this.search}&language=en-USinclude_adult=false&&page=${page}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      this.people = data.results;
      this.totalPages = data.total_pages;
      storeLoading.loading.people = true;
    },
    async getPersonDetail(id) {
      storeLoading = useStoreLoading();
      storeLoading.loading.personDetail = false;
      const res = await fetch(`${movieBaseUrl}person/${id}?api_key=${apiKey}&include_adult=false&language=en-US`);
      const data = await res.json();
      this.person = data;
      storeLoading.loading.personDetail = true;
    },
    async getPersonImages(id) {
      storeLoading = useStoreLoading();
      storeLoading.loading.personDetail = false;
      const res = await fetch(`${movieBaseUrl}person/${id}/images?api_key=${apiKey}`);
      const data = await res.json();
      this.personImages = data.profiles;
      storeLoading.loading.personDetail = true;
    },
    async getTvShowsByPerson(id) {
      const res = await fetch(
        `${movieBaseUrl}person/${id}?api_key=${apiKey}&language=en-US&append_to_response=tv_credits`
      );
      const data = await res.json();
      this.tvShowsByPerson = data.tv_credits.cast;
    }
  }
});
