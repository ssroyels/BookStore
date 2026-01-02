import React, { Suspense, lazy } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";

const Banner = lazy(() => import("../components/Banner.jsx"));
const Freebook = lazy(() => import("../components/freebook.jsx"));

/* 🔄 Reusable Loader */
const SectionLoader = ({ height = "h-[40vh]" }) => (
  <div
    className={`
      ${height}
      flex items-center justify-center
      text-gray-500 text-lg
      animate-pulse
    `}
  >
    Loading content...
  </div>
);

const Home = () => {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="pt-16"> {/* navbar height offset */}
        
        {/* BANNER */}
        <Suspense fallback={<SectionLoader height="h-[50vh]" />}>
          <section
            id="banner"
            className="
              max-w-screen-2xl mx-auto
              px-4 sm:px-6 md:px-16
              py-8 md:py-12
            "
          >
            <Banner />
          </section>
        </Suspense>

        {/* FREE COURSES */}
        <Suspense fallback={<SectionLoader height="h-[35vh]" />}>
          <section
            id="free-books"
            className="
              max-w-screen-2xl mx-auto
              px-4 sm:px-6 md:px-16
              py-10 md:py-16
            "
          >
            <Freebook />
          </section>
        </Suspense>

      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
