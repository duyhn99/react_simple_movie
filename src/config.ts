import axios from 'axios';

export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_URL = 'https://api.themoviedb.org/3';
export const API_LANGUAGE = 'en-US';

export const itemsPerPage = 20;

export const tmdbAPI = {
  getSearchMovies: (query: string) => `${API_URL}/search/movie?language=${API_LANGUAGE}&${query}`,
  getMoviesList: (type: string, query?: string) =>
    `${API_URL}/movie/${type}?language=${API_LANGUAGE}${query ? `&${query}` : ''}`,
  getMovieDetails: (id: string | number) => `${API_URL}/movie/${id}?language=${API_LANGUAGE}`,
  getMovieMeta: (id: string | number, type: string) => `${API_URL}/movie/${id}/${type}?language=${API_LANGUAGE}`,
  imageOriginal: (url: string) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url: string) => `https://image.tmdb.org/t/p/w500/${url}`
};

export const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    })
    .then((res) => res.data);
