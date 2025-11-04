import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb";

export const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // review đang mở

  useEffect(() => {
    getMovieReviews(id)
      .then((data) => setReviews(data.results || []))
      .catch(console.error);
  }, [id]);

  if (!reviews.length)
    return (
      <div className="p-6 md:p-12 text-center text-gray-400">
        <h2 className="text-2xl font-bold mb-4">💬 Đánh giá từ người xem</h2>
        <p>Chưa có đánh giá nào cho phim này.</p>
      </div>
    );

  const toggleExpand = (reviewId) => {
    setExpandedId((prev) => (prev === reviewId ? null : reviewId));
  };

  return (
    <div className="p-6 md:p-12 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">💬 Đánh giá từ người xem</h2>

      <div className="space-y-6">
        {reviews.map((review) => {
          const isExpanded = expandedId === review.id;
          const content = isExpanded
            ? review.content
            : review.content.slice(0, 500);

          return (
            <div
              key={review.id}
              className="bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700"
            >
              <div className="flex items-center gap-3 mb-3">
                {review.author_details.avatar_path ? (
                  <img
                    src={
                      review.author_details.avatar_path.startsWith("/https")
                        ? review.author_details.avatar_path.substring(1)
                        : `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
                    }
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm">
                    👤
                  </div>
                )}
                <div>
                  <p className="font-semibold">{review.author}</p>
                  {review.author_details.rating && (
                    <p className="text-yellow-400 text-sm">
                      ⭐ {review.author_details.rating} / 10
                    </p>
                  )}
                </div>
              </div>

              <p
                className="text-gray-300 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: (
                    isExpanded ? content : content + "..."
                  ),
                }}
              />

              {review.content.length > 500 && (
                <button
                  className="mt-2 text-blue-400 underline text-sm"
                  onClick={() => toggleExpand(review.id)}
                >
                  {isExpanded ? "Thu gọn" : "Xem thêm"}
                </button>
              )}

              <p className="text-gray-500 text-xs mt-3">
                Ngày: {new Date(review.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
