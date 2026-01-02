import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

/* 🔤 ALL WORDS USED IN COMPONENT */
const WORDS = [
  "Developers",
  "Creators",
  "Founders",
  "Engineers",
  "Students",
  "Designers",
  "Freelancers",
  "Entrepreneurs",
];

const Banner = () => {
  const [email, setEmail] = useState("");
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  /* ⌨️ TYPEWRITER LOGIC */
  useEffect(() => {
    const current = WORDS[index];
    const speed = deleting ? 50 : 120;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));

        if (text === current) {
          setTimeout(() => setDeleting(true), 1000); // pause after full word
        }
      } else {
        setText(current.slice(0, text.length - 1));

        if (text === "") {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % WORDS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  /* 📧 EMAIL */
  const handleSubmit = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Welcome aboard 🚀");
    setEmail("");
  };

  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-20 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Learn something
            <span className="block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              new every single day
            </span>

            {/* 🔁 TYPEWRITER WORDS */}
            <span className="block mt-3 text-pink-500">
              for {text}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-gray-600 text-sm md:text-lg max-w-xl">
            Build real-world skills with free and premium courses designed for
            developers, creators, and future founders.
          </p>

          {/* EMAIL */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-pink-500 outline-none"
            />

            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
            >
              Get Started
            </button>
          </div>

          <p className="text-xs text-gray-400">
            No spam. Unsubscribe anytime.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://cdn.creazilla.com/cliparts/39999/bookstore-clipart-md.png"
            alt="Learning illustration"
            className="w-[220px] md:w-[380px] drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
