import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieCredits } from "../../api/tmdb";

export const Credits = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);

  const [castPage, setCastPage] = useState(1);
  const [crewPage, setCrewPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const data = await getMovieCredits(id);
        setCast(data.cast || []);
        setCrew(data.crew || []);
      } catch (error) {
        console.error("Lỗi khi tải credits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCredits();
  }, [id]);

  if (loading) return <p>Đang tải danh sách diễn viên và đội ngũ...</p>;
  if (!cast.length && !crew.length) return <p>Chưa có thông tin.</p>;

  const totalCastPages = Math.ceil(cast.length / itemsPerPage);
  const currentCast = cast.slice(
    (castPage - 1) * itemsPerPage,
    castPage * itemsPerPage
  );

  // Tính trang hiện tại của crew
  const totalCrewPages = Math.ceil(crew.length / itemsPerPage);
  const currentCrew = crew.slice(
    (crewPage - 1) * itemsPerPage,
    crewPage * itemsPerPage
  );

  return (
    <div className="p-6 md:p-12 bg-gray-950 text-white">
      <h2 className="text-2xl font-bold mb-6">🎭 Diễn viên</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {currentCast.map((actor) => (
          <Link
            to={`/cast/${actor.name}`}
            key={actor.cast_id}
            className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-3 shadow-lg"
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  : "https://placehold.co/300x450?text=No+Image"
              }
              alt={actor.name}
              className="w-full rounded-lg mb-3 aspect-[2/3] object-cover"
            />
            <h3 className="font-semibold">{actor.name}</h3>
            <p className="text-gray-400 text-sm">{actor.character}</p>
          </Link>
        ))}
      </div>

      {/* Nút phân trang cast */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCastPage((p) => Math.max(p - 1, 1))}
          disabled={castPage === 1}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Trước
        </button>
        {[...Array(totalCastPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCastPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              castPage === idx + 1 ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCastPage((p) => Math.min(p + 1, totalCastPages))}
          disabled={castPage === totalCastPages}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>

      {/* Crew */}
      <h2 className="text-2xl font-bold mt-12 mb-6">🎬 Đội ngũ</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {currentCrew.map((member) => (
          <div
            key={member.credit_id}
            className="flex flex-col items-center text-center bg-gray-900 rounded-xl p-3 shadow-lg"
          >
            <img
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w300${member.profile_path}`
                  : "https://placehold.co/300x450?text=No+Image"
              }
              alt={member.name}
              className="w-full rounded-lg mb-3 aspect-[2/3] object-cover"
            />
            <h3 className="font-semibold">{member.name}</h3>
            <p className="text-gray-400 text-sm">{member.job}</p>
          </div>
        ))}
      </div>
      {/* Nút phân trang crew */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCrewPage((p) => Math.max(p - 1, 1))}
          disabled={crewPage === 1}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Trước
        </button>
        {[...Array(totalCrewPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCrewPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              crewPage === idx + 1 ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCrewPage((p) => Math.min(p + 1, totalCrewPages))}
          disabled={crewPage === totalCrewPages}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};
