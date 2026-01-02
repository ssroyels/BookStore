import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import "./index.css";

/* 🛡️ Global Error Boundary */
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex items-center justify-center text-xl">
          ⚠️ Something went wrong
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center">
                Loading app...
              </div>
            }
          >
            <div className="min-h-screen bg-white dark:bg-slate-900 dark:text-white transition-colors">
              <App />
            </div>
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
