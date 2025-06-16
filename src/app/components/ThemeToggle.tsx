"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark-mode");
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }

    document.body.style.transition = "none";
    setTimeout(() => {
      document.body.style.transition = "";
    }, 50);
  };

  return (
    <motion.button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isDarkMode ? (
          <FiSun className={styles.icon} />
        ) : (
          <FiMoon className={styles.icon} />
        )}
      </motion.div>
    </motion.button>
  );
}
