import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  // initial load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setIsDark(true);
    if (saved === "light") setIsDark(false);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });c
  };

  const themeName = isDark ? "dark" : "light";

  return { isDark, themeName, toggleTheme };
};

export default useDarkMode;
