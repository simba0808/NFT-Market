"use client"

import React, { useState, useEffect, createContext, useContext, PropsWithChildren } from "react";

type Themes = "dark" | "light";

type ThemeState = {
  theme: Themes;
  setTheme(theme: Themes): void;
};

const getStorageData = (): "dark" | "light" => {
  if (typeof window != "undefined" && window.localStorage) {
    const storedRef: string | null = window.localStorage.getItem("theme");
    if (typeof storedRef == "string") {
      return storedRef === "dark"? "dark" : "light";
    }

    const userMedia = window.matchMedia("prefers-color-scheme: dark");
    if (userMedia.matches) {
      return "dark";
    }
    return "light";
  }
  return "light";
}

const ThemeContext = createContext<ThemeState | null>(null);

const useTheme = () : ThemeState => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Please use ThemeProvider in parent component");
  }

  return context;
}

export const ThemeProvider = (props: PropsWithChildren) => {
  const [theme, setTheme] = useState<Themes>("light");

  useEffect(() => {
    setTheme(getStorageData());
    if(theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default useTheme;