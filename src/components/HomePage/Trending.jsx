import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/tmdb";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    getTrendingMovies(timeWindow)
      .then((res) => setMovies(res.results || []))
      .catch((err) => console.error(err));
  }, [timeWindow]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🌟 Xu hướng</h2>
        <select
          className="select select-bordered"
          value={timeWindow}
          onChange={(e) => setTimeWindow(e.target.value)}
        >
          <option value="day">Hôm nay</option>
          <option value="week">Tuần này</option>
        </select>
      </div>

      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        modules={[Pagination, Autoplay]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="mb-16">
            <Link to={`/movie/${movie.id}`} className="card bg-base-100 shadow-md h-full">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-t-lg"
              />
              <div className="p-2 text-center">
                <div className="tooltip" data-tip={movie.title}>
                  <p className="font-semibold line-clamp-1">{movie.title}</p>
                </div>
                <p className="text-sm">
                  {movie.release_date
                    ? movie.release_date.split("-").reverse().join("-")
                    : "N/A"}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
