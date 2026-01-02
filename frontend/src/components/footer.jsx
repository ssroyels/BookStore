import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    toast.success("Subscribed successfully 🚀");
    setEmail("");
  };

  return (
    <footer className="bg-base-200 text-base-content mt-20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-20 py-14 grid gap-12 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-pink-500">BookStore</h2>
          <p className="mt-4 text-sm text-gray-500">
            Learn new skills every day with curated courses and real-world
            projects.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-pink-500">About Us</Link></li>
            <li><Link className="hover:text-pink-500">Careers</Link></li>
            <li><Link className="hover:text-pink-500">Blog</Link></li>
            <li><Link className="hover:text-pink-500">Press</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-pink-500">Contact</Link></li>
            <li><Link className="hover:text-pink-500">Help Center</Link></li>
            <li><Link className="hover:text-pink-500">Privacy Policy</Link></li>
            <li><Link className="hover:text-pink-500">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-500 mb-3">
            Get free resources and course updates.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* SOCIAL + COPYRIGHT */}
      <div className="border-t border-base-300">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* SOCIAL ICONS */}
          <div className="flex gap-5">
            <a className="hover:text-pink-500 transition" aria-label="Twitter">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775..." />
              </svg>
            </a>
            <a className="hover:text-pink-500 transition" aria-label="YouTube">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246..." />
              </svg>
            </a>
            <a className="hover:text-pink-500 transition" aria-label="Facebook">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5..." />
              </svg>
            </a>
          </div>

          {/* COPYRIGHT */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BookStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
