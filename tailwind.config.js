/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', 'Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'neu-raised': '-4px -4px 12px rgba(255, 255, 255, 1), 4px 6px 16px rgba(0, 0, 0, 0.06)',
        'neu-raised-sm': '-2px -2px 6px rgba(255, 255, 255, 1), 2px 3px 8px rgba(0, 0, 0, 0.04)',
        'neu-raised-lg': '-6px -6px 18px rgba(255, 255, 255, 1), 8px 12px 24px rgba(0, 0, 0, 0.08)',
        'neu-inset': 'inset 2px 2px 5px rgba(0, 0, 0, 0.05), inset -2px -2px 5px rgba(255, 255, 255, 1)',
        'neu-inset-sm': 'inset 1.5px 1.5px 3px rgba(0, 0, 0, 0.04), inset -1.5px -1.5px 3px rgba(255, 255, 255, 0.95)',
        'neu-amber': '-3px -3px 8px rgba(255, 255, 255, 0.7), 4px 6px 16px rgba(245, 158, 11, 0.35)',
        'card-glow': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
      }
    },
  },
  plugins: [],
};
