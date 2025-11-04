export const TMDB_ENDPOINTS = {
  TRENDING: (mediaType = "movie", timeWindow = "day") =>
    `/trending/${mediaType}/${timeWindow}?language=vi-VN`,

  MOVIE_DETAIL: (movieId) => `/movie/${movieId}?language=vi-VN`,

  TRAILER: (movieId) => `/movie/${movieId}/videos`,

  REVIEW: (movieId) => `/movie/${movieId}/reviews`,

  MOVIECREDITS: (movieId) => `/movie/${movieId}/credits?language=en-US`,
};