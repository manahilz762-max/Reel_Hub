import EventAlbum from "./components/EventAlbum";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Administration from "./pages/Administration";
import GlobalPartnerships from "./pages/GlobalPartnerships";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Work from "./pages/Work";
import DailyBlogs from "./pages/DailyBlogs";
import Portfolios from "./pages/Portfolios";
import Events from "./pages/Events"
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/official/mou" element={<Navigate to="/mou" replace />} />
          <Route path="/events/:kind/:slug" element={<Events />} />
          <Route path="/daily-blogs" element={<DailyBlogs />} />
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/work/:slug" element={<EventAlbum />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/mou" element={<GlobalPartnerships />} />

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
