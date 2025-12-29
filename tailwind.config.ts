import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgGrid(value)}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgGrid(value)}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgDot(value)}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;

// Helper to resolve colors
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function svgGrid(color: any) {
  return `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='${encodeURIComponent(
    color
  )}'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e`;
}

function svgDot(color: any) {
  return `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3e%3ccircle fill='${encodeURIComponent(
    color
  )}' id='pattern-circle' cx='10' cy='10' r='1.6257413380501518'/%3e%3c/svg%3e`;
}
