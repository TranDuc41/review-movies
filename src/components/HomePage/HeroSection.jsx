import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies("week") // lấy xu hướng tuần
      .then((res) => setMovies(res.results.slice(0, 5))) // chỉ lấy 5 phim đầu
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[650px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-full">
              {/* Ảnh nền */}
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Overlay mờ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Nội dung */}
              <div className="absolute bottom-20 left-10 text-white max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {movie.title}
                </h2>
                <p className="mb-6 line-clamp-3 opacity-90">
                  {movie.overview || "Không có mô tả cho phim này."}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                  🎬 Xem chi tiết
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
