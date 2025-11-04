import React, { useEffect, useState } from "react";
import { getTrendingMovies, getMovieVideos } from "../../api/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export const FeaturedTrailers = () => {
  const [movies, setMovies] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách phim trending
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await getTrendingMovies("week");
        setMovies(res.results?.slice(0, 8) || []);
      } catch (err) {
        console.error("Lỗi khi tải danh sách phim:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Hàm mở trailer
  const handleWatchTrailer = async (movieId) => {
    try {
      const res = await getMovieVideos(movieId);
      console.log(res.results);
      const trailer = res.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (trailer) setSelectedVideo(trailer.key);
      else alert("Không có trailer nào được tìm thấy.");
    } catch (err) {
      console.error("Lỗi khi tải trailer:", err);
    }
  };

  if (loading) return <p className="text-center py-8">Đang tải trailer...</p>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">🎥 Trailer nổi bật</h2>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="mb-12">
            <div className="card bg-base-100 shadow-md h-full hover:scale-[1.02] transition-transform">
              <div className="relative">
                <img
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                      : "/no-poster.jpg"
                  }
                  alt={movie.title}
                  className="rounded-t-lg w-full h-[200px] object-cover"
                />
                <button
                  className="btn btn-circle btn-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  onClick={() => handleWatchTrailer(movie.id)}
                >
                  ▶
                </button>
              </div>
              <div className="p-3 text-center">
                <Link to={`/movie/${movie.id}`} className="font-semibold line-clamp-2">{movie.title}</Link>
              </div>
              <div className="flex flex-col items-center mb-3">
                <div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center font-semibold text-sm"
                  style={{
                    background: `conic-gradient(#facc15 ${
                      movie.vote_average * 36
                    }deg, #e5e7eb 0deg)`,
                  }}
                >
                  <span className="absolute text-gray-800">
                    {(movie.vote_average * 10).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  {movie.vote_count} lượt vote
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal hiển thị trailer */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-[90%] md:w-[70%] lg:w-[60%] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="Trailer"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="btn btn-sm btn-circle absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
