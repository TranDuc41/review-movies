import { TMDB_ENDPOINTS } from "./endpoints";

const API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

const fetchFromTMDB = async (endpoint) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("TMDB API Error:", error);
    throw error;
  }
};

// Hàm export ra cho dễ dùng
export const getTrendingMovies = (timeWindow = "day") =>
  fetchFromTMDB(TMDB_ENDPOINTS.TRENDING("movie", timeWindow));

export const getMovieVideos = (movieId) =>
  fetchFromTMDB(TMDB_ENDPOINTS.TRAILER(movieId));

export const getMovieDetail = (movieId) =>
  fetchFromTMDB(TMDB_ENDPOINTS.MOVIE_DETAIL(movieId));

export const getMovieReviews = (movieId) =>
  fetchFromTMDB(TMDB_ENDPOINTS.REVIEW(movieId));

export const getMovieCredits = (movieId) =>
  fetchFromTMDB(TMDB_ENDPOINTS.MOVIECREDITS(movieId));

export const getMoviePopular = (page = "1") =>
  fetchFromTMDB(TMDB_ENDPOINTS.POPULAR(page));

export const getMovieGenres = () =>
  fetchFromTMDB(TMDB_ENDPOINTS.MOVIE_GENRES());

export const getMovieNowPlaying = (page = "1") =>
  fetchFromTMDB(TMDB_ENDPOINTS.NOWPLAYING(page));

export const searchPerson = (query) =>
  fetchFromTMDB(TMDB_ENDPOINTS.SEARCH_PERSON(query));

export const getCastDetail = (castId) =>
  fetchFromTMDB(TMDB_ENDPOINTS.CAST_DETAIL(castId));

export const getPersonCredits = (personId) =>
  fetchFromTMDB(TMDB_ENDPOINTS.PERSON_CREDITS(personId));
