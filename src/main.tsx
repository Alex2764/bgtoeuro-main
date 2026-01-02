import { createRoot } from "react-dom/client";
import { Capacitor } from "@capacitor/core";
import App from "./App.tsx";
import "./index.css";

// Initialize Capacitor plugins
if (Capacitor.isNativePlatform()) {
  import("@capacitor/status-bar").then(({ StatusBar }) => {
    StatusBar.setStyle({ style: "dark" });
    StatusBar.setBackgroundColor({ color: "#ffffff" });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
