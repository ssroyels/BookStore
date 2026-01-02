import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./cards.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Freebook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  /* ---------------- FETCH FREE COURSES (BACKEND) ---------------- */
  useEffect(() => {
    const controller = new AbortController();

    const fetchFreeCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `${API_URL}/book/search`,
          {
            params: { free: true },      // ✅ backend filter
            withCredentials: true,       // ✅ auth / cookies ready
            signal: controller.signal,
          }
        );

        setBooks(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError("Failed to load free courses");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFreeCourses();
    return () => controller.abort();
  }, [retry]);

  /* ---------------- SLIDER CONFIG ---------------- */
  const settings = {
    dots: books.length > 1,
    arrows: books.length > 4,
    infinite: books.length > 4,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <div className="max-w-screen-2xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-semibold">{error}</p>
        <button
          onClick={() => setRetry((r) => r + 1)}
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        🚫 No free courses available right now
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */

  return (
    <section className="max-w-screen-2xl mx-auto md:px-20 px-4 py-[10vh]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          🎁 Free Offered Courses
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Learn premium-quality skills for free. No credit card. No bullshit.
        </p>
      </div>

      <Slider {...settings}>
        {books.map((item) => (
          <Cards key={item._id || item.id} item={item} />
        ))}
      </Slider>
    </section>
  );
};

export default Freebook;
