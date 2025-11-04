import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { pathname } = useLocation();

  const items = [
    { title: "Trang chủ", url: "/" },
    { title: "Phổ biến", url: "/movie" },
    { title: "Đang phát", url: "/movie/now-playing" },
    { title: "Sắp tới", url: "/movie/upcoming" },
    { title: "Đánh giá cao", url: "/movie/top-rated" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Review Movies
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {items.map((item, index) => {
            const isActive = pathname === item.url;
            return (
              <li key={index}>
                <Link
                  to={item.url}
                  className={`${
                    isActive ? "bg-primary text-white rounded-lg" : ""
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
