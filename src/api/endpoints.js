export const TMDB_ENDPOINTS = {
  TRENDING: (mediaType = "movie", timeWindow = "day") =>
    `/trending/${mediaType}/${timeWindow}?language=vi-VN`,

  MOVIE_DETAIL: (movieId) => `/movie/${movieId}?language=vi-VN`,

  TRAILER: (movieId) => `/movie/${movieId}/videos`,

  REVIEW: (movieId) => `/movie/${movieId}/reviews`,

  MOVIECREDITS: (movieId) => `/movie/${movieId}/credits?language=en-US`,

  POPULAR: (page = "1") => `/movie/popular?language=vi-VN&page=${page}`,

  MOVIE_GENRES: () => `/genre/movie/list`,

  NOWPLAYING: (page = "1") => `/movie/now_playing?language=vi-VN&page=${page}`,

  SEARCH_PERSON: (query) =>
    `/search/person?query=${encodeURIComponent(query)}&language=vi-VN`,

  CAST_DETAIL: (castId) => `/person/${castId}?language=vi-VN`,

  PERSON_CREDITS: (personId) =>
    `/person/${personId}/movie_credits?language=vi-VN`,
};
