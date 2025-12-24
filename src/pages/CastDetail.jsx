import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchPerson, getCastDetail, getPersonCredits } from "../api/tmdb";

export const CastDetail = () => {
  const { name } = useParams();

  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Search person để lấy ID
        const searchRes = await searchPerson(name);
        const personId = searchRes?.results?.[0]?.id;

        if (!personId) {
          setPerson(null);
          setCredits([]);
          return;
        }

        // 2️⃣ Gọi API chi tiết + phim
        const [personRes, creditsRes] = await Promise.all([
          getCastDetail(personId),
          getPersonCredits(personId),
        ]);

        setPerson(personRes);
        setCredits(creditsRes?.cast || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!person) {
    return <div className="text-center mt-10">Không tìm thấy diễn viên</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Actor info */}
      <div className="flex gap-6 items-start">
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
              : "/no-avatar.png"
          }
          alt={person.name}
          className="w-40 rounded-xl"
        />

        <div>
          <h1 className="text-2xl font-bold">{person.name}</h1>

          <p className="text-gray-400">
            Giới tính:{" "}
            {person.gender === 1 ? "Nữ" : person.gender === 2 ? "Nam" : "Khác"}
          </p>

          <p className="text-gray-400">Sinh ngày: {person.birthday || "N/A"}</p>

          <p className="text-gray-400">
            Nơi sinh: {person.place_of_birth || "N/A"}
          </p>

          <p className="text-sm mt-2">
            Mức độ phổ biến: {person.popularity?.toFixed(1)}
          </p>
        </div>
      </div>

      {/* Biography */}
      {person.biography && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Tiểu sử</h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {person.biography}
          </p>
        </div>
      )}

      {/* Movies */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Phim đã tham gia</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {credits.map((movie) => (
            <div
              key={movie.credit_id}
              className="bg-gray-900 rounded-xl overflow-hidden"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "/no-poster.png"
                }
                alt={movie.title || movie.name}
                className="w-full"
              />

              <div className="p-2">
                <h3 className="text-sm font-semibold">
                  {movie.title || movie.name}
                </h3>

                <p className="text-xs text-gray-400">
                  Vai diễn: {movie.character || "N/A"}
                </p>

                <p className="text-xs text-gray-500">
                  {movie.release_date?.slice(0, 4) ||
                    movie.first_air_date?.slice(0, 4)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
