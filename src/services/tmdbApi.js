import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'fr-FR'
  }
});

export const movieService = {
  // Récupérer les films populaires
  getPopularMovies: async (page = 1) => {
    try {
      const response = await tmdbApi.get('/movie/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des films populaires:', error);
      throw error;
    }
  },

  // Rechercher des films
  searchMovies: async (query, page = 1) => {
    try {
      const response = await tmdbApi.get('/search/movie', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche de films:', error);
      throw error;
    }
  },

  // Obtenir les détails d'un film
  getMovieDetails: async (movieId) => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du film:', error);
      throw error;
    }
  },

  // Obtenir les films tendances
  getTrendingMovies: async () => {
    try {
      const response = await tmdbApi.get('/trending/movie/day');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des films tendances:', error);
      throw error;
    }
  }
};

export default tmdbApi;