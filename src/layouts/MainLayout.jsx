import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { Header } from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet /> {/* Nơi hiển thị trang con */}
      </main>
      <Footer />
    </div>
  );
}