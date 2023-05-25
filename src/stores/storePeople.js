import { defineStore } from 'pinia';
import { useStoreLoading } from '@/stores/storeLoading';

let storeLoading;

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

      let url = `${import.meta.env.VITE_API_URL}/person/popular?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&include_adult=false&page=${page}`;

      if (this.search) {
        url = `${import.meta.env.VITE_API_URL}search/person?api_key=${import.meta.env.VITE_API_KEY}&query=${
          this.search
        }&language=en-USinclude_adult=false&&page=${page}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        this.people = data.results;
        this.totalPages = data.total_pages;
        storeLoading.loading.people = true;
      } catch (err) {}
    },
    async getPersonDetail(id) {
      storeLoading = useStoreLoading();
      storeLoading.loading.personDetail = false;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}person/${id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&include_adult=false&language=en-US`
        );
        const data = await res.json();
        this.person = data;
        storeLoading.loading.personDetail = true;
      } catch (err) {}
    },
    async getPersonImages(id) {
      storeLoading = useStoreLoading();
      storeLoading.loading.personDetail = false;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}person/${id}/images?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await res.json();
        this.personImages = data.profiles;
        storeLoading.loading.personDetail = true;
      } catch (err) {}
    },
    async getTvShowsByPerson(id) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}person/${id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&append_to_response=tv_credits`
        );
        const data = await res.json();
        this.tvShowsByPerson = data.tv_credits.cast;
      } catch (err) {}
    }
  }
});
