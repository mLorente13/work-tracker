/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "oklch(0.09 0 0)",
        foreground: "oklch(0.98 0 0)",
        border: "oklch(0.25 0 0)",
        muted: "oklch(0.18 0 0)",
        accent: "oklch(0.65 0.18 250)",
        "muted-foreground": "oklch(0.65 0 0)",
      },
      backgroundColor: {
        accent: "oklch(0.65 0.18 250)",
      },
    },
  },
  plugins: [],
};
