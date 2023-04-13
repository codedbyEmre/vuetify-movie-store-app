import { createRouter, createWebHistory } from 'vue-router';
import ViewMovies from '@/views/ViewMovies.vue';
import ViewTvShows from '@/views/ViewTvShows.vue';
import ViewPeople from '@/views/ViewPeople.vue';
import ViewPageNotFound from '@/views/ViewPageNotFound.vue';
import MovieDetail from '@/components/Movies/MovieDetail.vue';
import TvShowDetail from '@/components/TvShows/TvShowDetail.vue';
import PersonDetail from '@/components/Person/PersonDetail.vue';

const routes = [
  {
    path: '/',
    name: 'movies',
    component: ViewMovies
  },
  {
    path: '/movie-detail/:id',
    name: 'movie-detail',
    component: MovieDetail
  },
  {
    path: '/tvShows',
    name: 'tv-shows',
    component: ViewTvShows
  },
  {
    path: '/tvShow-detail/:id',
    name: 'tv-show-detail',
    component: TvShowDetail
  },
  {
    path: '/people',
    name: 'people',
    component: ViewPeople
  },
  {
    path: '/person-detail/:id',
    name: 'person-detail',
    component: PersonDetail
  },
  {
    path: '/:catchAll(.*)',
    name: 'page-not-found',
    component: ViewPageNotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
