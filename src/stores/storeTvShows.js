import { defineStore } from 'pinia';
import { useStoreLoading } from '@/stores/storeLoading';

let storeLoading;

const apiKey = import.meta.env.VITE_API_KEY;
let tvShowsBaseUrl = 'https://api.themoviedb.org/3/';

export const useStoreTvShows = defineStore('storeTvShows', {
  state: () => {
    return {
      tvShows: [],
      search: '',
      tvShowDetails: {},
      tvShowCast: [],
      tvShowCrew: [],
      directors: '',
      producers: [],
      executive_producer: [],
      recommendedTvShows: [],
      tvShowVideos: [],
      page: 1,
      totalPages: 0
    };
  },
  actions: {
    async getTvShows(page = 1) {
      storeLoading = useStoreLoading();
      storeLoading.loading.tvShows = false;
      this.tvShows = [];

      let url = `${tvShowsBaseUrl}discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}`;

      if (this.search) {
        url = `${tvShowsBaseUrl}search/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&query=${this.search}&page=${page}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        this.tvShows = data.results;
        this.totalPages = data.total_pages;
        storeLoading.loading.tvShows = true;
      } catch (err) {}
    },
    async getTvShowDetail(id) {
      storeLoading = useStoreLoading();
      storeLoading.loading.tvShowDetail = false;
      try {
        const res = await fetch(`${tvShowsBaseUrl}tv/${id}?api_key=${apiKey}&language=en-US`);
        const data = await res.json();
        this.tvShowDetails = {
          title: data.name,
          bgImage: data.backdrop_path,
          voteAvg: data.vote_average,
          firstAirDate: data.first_air_date.slice(0, 4),
          lastAirDate: data.last_air_date.slice(0, 4),
          overview: data.overview,
          genres: data.genres,
          seasons: data.number_of_seasons,
          episodes: data.number_of_episodes
        };
        storeLoading.loading.tvShowDetail = true;
      } catch (err) {}
    },
    async getRecommendedTvShows(id) {
      try {
        const res = await fetch(`${tvShowsBaseUrl}tv/${id}/recommendations?api_key=${apiKey}&language=en-US`);
        const data = await res.json();
        this.recommendedTvShows = data.results;
      } catch (err) {}
    },
    async getCastAndCrewByTvShow(id) {
      try {
        const res = await fetch(`${tvShowsBaseUrl}tv/${id}/credits?api_key=${apiKey}`);
        const data = await res.json();
        this.tvShowCast = data.cast;
        this.tvShowCrew = data.crew;

        let mappedCrews = this.tvShowCrew.map(crew => {
          return {
            name: crew.name,
            job: crew.job
          };
        });

        this.directors = mappedCrews
          .filter(crew => crew.job === 'Director')
          .map(item => item.name)
          .join(', ');
        this.producers = mappedCrews
          .filter(crew => crew.job === 'Producer')
          .map(item => item.name)
          .join(', ');
        this.executive_producer = mappedCrews
          .filter(crew => crew.job === 'Executive Producer')
          .map(item => item.name)
          .join(', ');
      } catch (err) {}
    },
    async getVideosByTvShow(id) {
      try {
        const res = await fetch(`${tvShowsBaseUrl}tv/${id}/videos?api_key=${apiKey}&language=en-US`);
        const data = await res.json();
        this.tvShowVideos = data.results;
      } catch (err) {}
    }
  }
});
