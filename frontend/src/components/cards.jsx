import React, { useState } from "react";
import { Heart } from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80";

const Cards = ({ item }) => {
  const [liked, setLiked] = useState(false);

  const isFree =
    item.price === 0 ||
    item.price === "0" ||
    item.isFree === true;

  return (
    <div className="group relative">
      {/* CARD */}
      <div
        className="
          h-full rounded-2xl overflow-hidden
          bg-white dark:bg-slate-900
          border border-gray-200 dark:border-slate-700
          shadow-md hover:shadow-2xl
          transition-all duration-300
          hover:-translate-y-2
        "
      >
        {/* IMAGE */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image || FALLBACK_IMAGE}
            alt={typeof item.name === "string" ? item.name : "Course image"}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
            className="
              h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-110
            "
          />

          {/* CATEGORY */}
          <span
            className="
              absolute top-3 left-3
              px-3 py-1 text-xs font-medium
              rounded-full bg-black/70 text-white
              backdrop-blur
            "
          >
            {item.category}
          </span>

          {/* WISHLIST */}
          <button
            type="button"
            aria-label="Toggle wishlist"
            onClick={() => setLiked((v) => !v)}
            className="
              absolute top-3 right-3
              p-2 rounded-full
              bg-white/90 dark:bg-slate-800
              hover:scale-110 transition
            "
          >
            <Heart
              size={16}
              className={
                liked
                  ? "fill-pink-500 text-pink-500"
                  : "text-gray-600 dark:text-gray-300"
              }
            />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col gap-3">
          <h3 className="font-semibold text-lg line-clamp-1">
            {item.name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {item.title}
          </p>

          {/* FOOTER */}
          <div className="mt-auto flex items-center justify-between">
            <span
              className={`
                text-xs font-semibold px-3 py-1 rounded-full
                ${
                  isFree
                    ? "bg-green-100 text-green-600"
                    : "bg-pink-100 text-pink-600"
                }
              `}
            >
              {isFree ? "FREE" : `₹${item.price}`}
            </span>

            <button
              type="button"
              className="
                text-sm font-medium
                px-4 py-1.5 rounded-full
                border border-pink-500 text-pink-500
                hover:bg-pink-500 hover:text-white
                transition-all duration-200
              "
            >
              {isFree ? "Enroll Now" : "Buy Now"}
            </button>
          </div>
        </div>

        {/* HOVER GLOW */}
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-0 group-hover:opacity-100
            transition
          "
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-purple-500/10" />
        </div>
      </div>
    </div>
  );
};

export default Cards;
