import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export const future = {
  hoverOnlyWhenSupported: true,
};
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      background: "#010F16",
    },
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
    animation: {
      "marquee": "marquee 25s linear infinite",
      "marquee2": "marquee2 25s linear infinite",
      "fade-in": "fadeIn 1s",
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      marquee2: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
    },
    boxShadow: {
      highlight: "inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
    },
    screens: {
      "narrow": { raw: "(max-aspect-ratio: 3 / 2)" },
      "wide": { raw: "(min-aspect-ratio: 3 / 2)" },
      "taller-than-854": { raw: "(min-height: 854px)" },
    },
  },
};
export const plugins = [];
