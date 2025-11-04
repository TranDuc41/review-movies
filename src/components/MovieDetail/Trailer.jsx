import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieVideos } from "../../api/tmdb";

export const Trailer = () => {
  const { id } = useParams();
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const data = await getMovieVideos(id);
        const trailer = data.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setVideoKey(trailer?.key || null);
      } catch (err) {
        console.error("Lỗi khi tải trailer:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [id]);

  if (loading) return <p className="p-4 text-center">Đang tải trailer...</p>;
  if (!videoKey) return <p className="p-4 text-center">Chưa có trailer.</p>;

  return (
    <>
      <div className="flex my-6">
        <button
          onClick={() => setShowTrailer(true)}
          className="px-6 py-3 bg-primary text-white rounded-lg shadow-md transition"
        >
          🎬 Xem Trailer
        </button>
      </div>

      {/* Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()} // tránh click đóng khi click vào iframe
          >
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-3 -right-16 px-3 py-1 bg-gray-700 hover:bg-gray-800 text-white rounded"
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </>
  );
};
