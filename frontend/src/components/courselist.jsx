import React, { useEffect, useMemo, useState } from "react";
import Cards from "./cards";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const CATEGORIES = ["Frontend", "Backend", "Full Stack"];

const highlightText = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span
        key={i}
        className="bg-yellow-200 text-black px-1 rounded"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};


const Courselist = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  /* 🔹 Fetch ALL courses once */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/book`, {
          withCredentials: true,
        });
        setBooks(res.data);
      } catch (err) {
        console.log(err)
        console.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  /* 🔍 Filter locally (FAST) */
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchSearch =
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.title.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "all" || b.category === category;

      return matchSearch && matchCategory;
    });
  }, [books, search, category]);

  if (loading) {
    return (
      <div className="text-center py-20">Loading courses...</div>
    );
  }

  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-20 py-24">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold">
          Explore Our <span className="text-pink-500">Courses</span>
        </h1>
        <Link to="/">
          <button className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-lg">
            ← Back to Home
          </button>
        </Link>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-between">
        <input
          type="text"
          placeholder="Type anything to search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* GRID */}
      {filteredBooks.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          🚫 No courses found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredBooks.map((item) => (
            <Cards
              key={item._id}
              item={{
                ...item,
                name: highlightText(item.name, search),
                title: highlightText(item.title, search),
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Courselist;
