import { useEffect, useState } from "react";
import { getMovieNowPlaying } from "../api/tmdb";
import { Link } from "react-router-dom";

export const NowPlay = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNowPlaying = async (pageNumber = 1) => {
    try {
      const data = await getMovieNowPlaying(pageNumber);
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error("Lỗi khi tải phim:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying(page);
  }, [page]);

  if (loading) return <p className="p-4 text-center">Đang tải phim...</p>;
  if (!movies.length)
    return <p className="p-4 text-center">Chưa có phim nào.</p>;

  // Giới hạn số nút hiển thị, ví dụ 5 trang xung quanh
  const paginationRange = [];
  const start = Math.max(page - 2, 1);
  const end = Math.min(start + 4, totalPages);
  for (let i = start; i <= end; i++) paginationRange.push(i);

  return (
    <div>
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-white line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {movie.release_date ? movie.release_date : "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Trước
        </button>

        {paginationRange.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${
              page === p
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
      <div className="mt-3 flex justify-center gap-3">
        <p className="border px-3">{page}</p>
        <p>/</p>
        <p>{totalPages}</p>
      </div>
    </div>
  );
};
