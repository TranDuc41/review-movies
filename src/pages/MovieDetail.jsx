import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../api/tmdb";
import { Reviews } from "../components/MovieDetail/Reviews";
import { Credits } from "../components/MovieDetail/Cast";
import { Trailer } from "../components/MovieDetail/Trailer";

export const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetail(id).then(setMovie).catch(console.error);
  }, [id]);

  if (!movie) return <p className="p-4 text-center">Đang tải...</p>;

  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        {/* Overlay làm tối ảnh nền */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

        {/* Nội dung chính */}
        <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row gap-10">
          {/* Ảnh poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-xl shadow-2xl"
          />

          {/* Thông tin phim */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-lg italic text-gray-300 mb-6">
                “{movie.tagline}”
              </p>
            )}

            <div>
              <Trailer />
            </div>

            <div className="mb-6">
              <h2 className="font-semibold text-xl mb-2">Tóm tắt</h2>
              <p className="text-gray-200 leading-relaxed">
                {movie.overview || "Chưa có nội dung tóm tắt."}
              </p>
            </div>

            {/* Chi tiết phụ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300 text-sm">
              <p>
                <b>Ngày phát hành:</b> {movie.release_date}
              </p>
              <p>
                <b>Trạng thái:</b> {movie.status}
              </p>
              <p>
                <b>Thời lượng:</b> {movie.runtime} phút
              </p>
              <p>
                <b>Điểm trung bình:</b> {movie.vote_average} / 10
              </p>
              <p>
                <b>Doanh thu:</b>{" "}
                {movie.revenue
                  ? movie.revenue.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "USD",
                    })
                  : "N/A"}
              </p>
              <p>
                <b>Ngôn ngữ:</b>{" "}
                {movie.spoken_languages
                  ?.map((lang) => lang.english_name)
                  .join(", ")}
              </p>
            </div>

            {/* Thể loại */}
            {movie.genres?.length > 0 && (
              <div className="mt-6">
                <b>Thể loại:</b>{" "}
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm mr-2 mt-2"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Hãng sản xuất */}
            {movie.production_companies?.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-3">Hãng sản xuất:</h3>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className="flex flex-col items-center gap-2 bg-white/10 rounded-lg px-3 py-2"
                    >
                      {company.logo_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          className="h-6"
                        />
                      )}
                      <span>{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Credits />
      <Reviews />
    </>
  );
};
