import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "Users";

/* 🧠 Safe storage helpers */
const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

const setStoredUser = (user) => {
  if (!user) return localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔁 Hydrate auth on boot */
  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
    setLoading(false);
  }, []);

  /* 🔄 Cross-tab sync */
  useEffect(() => {
    const sync = (e) => {
      if (e.key === AUTH_STORAGE_KEY) {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  /* ⏱ Session expiry (optional) */
  useEffect(() => {
    if (!user?.expiresAt) return;

    const timeout = user.expiresAt - Date.now();
    if (timeout <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(logout, timeout);
    return () => clearTimeout(timer);
  }, [user]);

  /* ✅ Login */
  const login = (userData) => {
    setUser(userData);
    setStoredUser(userData);
  };

  /* 🚪 Logout */
  const logout = () => {
    setUser(null);
    setStoredUser(null);
  };

  /* 🧠 Guard helper */
  const requireAuth = () => {
    if (!user) {
      throw new Error("Authentication required");
    }
    return user;
  };

  /* ⚡ Memoized value */
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login,
      logout,
      requireAuth,
    }),
    [user, loading]
  );

  /* 🧊 Hydration guard */
  if (loading) return null;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/* 🧩 Hook */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
