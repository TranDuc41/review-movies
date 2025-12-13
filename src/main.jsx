import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { MovieDetail } from "./pages/MovieDetail.jsx";
import { Movie } from "./pages/Movie.jsx";
import { NowPlay } from "./pages/NowPlay.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* / */}
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="movie" element={<Movie />} />
          <Route path="movie/now-playing" element={<NowPlay />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
