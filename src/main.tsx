import { createRoot } from "react-dom/client";
import { Capacitor } from "@capacitor/core";
import App from "./App.tsx";
import "./index.css";

// Initialize Capacitor plugins
if (Capacitor.isNativePlatform()) {
  import("@capacitor/status-bar").then(({ StatusBar }) => {
    // Check initial theme preference
    const isDark = document.documentElement.classList.contains("dark");
    StatusBar.setStyle({ style: isDark ? "light" : "dark" });
    StatusBar.setBackgroundColor({ color: isDark ? "#1a1f2e" : "#ffffff" });

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      StatusBar.setStyle({ style: isDarkNow ? "light" : "dark" });
      StatusBar.setBackgroundColor({ color: isDarkNow ? "#1a1f2e" : "#ffffff" });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
