import { defineStore } from 'pinia';
import { useStoreLoading } from '@/stores/storeLoading';

let storeLoading = null;

export const useStoreMovies = defineStore('storeMovies', {
  state: () => {
    return {
      movies: [],
      search: '',
      moviesDetails: {},
      movieCast: [],
      movieCrew: [],
      directors: '',
      producers: [],
      writers: [],
      movieVideos: [],
      moviesByPerson: [],
      recommendedMovies: [],
      page: 1,
      totalPages: 0
    };
  },
  actions: {
    async getMovies(page = 1) {
      storeLoading = useStoreLoading();
      storeLoading.loading.movies = false;
      this.movies = [];

      let url = `${import.meta.env.VITE_API_URL}discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&include_adult=false&page=${page}`;

      if (this.search) {
        url = `${import.meta.env.VITE_API_URL}search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&include_adult=false&query=${this.search}&page=${page}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        this.movies = data.results;
        this.totalPages = data.total_pages;
        storeLoading.loading.movies = true;
      } catch (err) {}
    },
    async getMovieDetail(id) {
      storeLoading = useStoreLoading();
      storeLoading.loading.moviesDetail = false;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}movie/${id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&include_adult=false&language=en-US`
        );
        const data = await res.json();
        this.moviesDetails = {
          title: data.title,
          overview: data.overview,
          bgImage: data.backdrop_path,
          poster: data.poster_path,
          releaseDate: data.release_date,
          runTime: data.runtime,
          genres: data.genres,
          popularity: data.popularity,
          voteAvg: data.vote_average,
          homepage: data.homepage,
          imdb: data.imdb_id
        };
        this.getRecommendedMovies(id);
        this.getCastAndCrewByMovie(id);
        this.getVideosByMovie(id);
        storeLoading.loading.moviesDetail = true;
      } catch (err) {}
    },
    async getRecommendedMovies(id) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}movie/${id}/recommendations?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US`
        );
        const data = await res.json();
        this.recommendedMovies = data.results;
      } catch (err) {}
    },
    async getCastAndCrewByMovie(id) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await res.json();
        this.movieCast = data.cast;
        this.movieCrew = data.crew;

        let mappedCrews = this.movieCrew.map(crew => {
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
        this.writers = mappedCrews
          .filter(crew => crew.job === 'Writer')
          .map(item => item.name)
          .join(', ');
      } catch (err) {}
    },
    async getVideosByMovie(id) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
        );
        const data = await res.json();
        this.movieVideos = data.results;
      } catch (err) {}
    },
    async getMoviesByPerson(id) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}discover/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }&with_people=${id}&language=en-US`
        );
        const data = await res.json();
        this.moviesByPerson = data.results;
      } catch (err) {}
    },
    changePage() {
      this.page++;
      this.getMovies(this.page);
    }
  }
});
