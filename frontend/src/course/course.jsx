import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import Courselist from "../components/courselist";
import Footer from "../components/footer";

/* 🧠 Page title hook */
const usePageTitle = (title) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);
};

const Course = () => {
  usePageTitle("Courses | BookStore");

  return (
    <>
      <Navbar />

      {/* 🧩 Page Content */}
      <main className="min-h-screen pt-16 bg-gray-50 dark:bg-slate-900">
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              Loading courses...
            </div>
          }
        >
          <Courselist />
        </Suspense>
      </main>

      <Footer />
    </>
  );
};

export default Course;

