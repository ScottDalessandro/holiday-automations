/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Festive color palette - customize as needed
        'festive-red': '#dc2626',
        'festive-green': '#16a34a',
        'festive-gold': '#ca8a04',
      },
    },
  },
  plugins: [],
};
