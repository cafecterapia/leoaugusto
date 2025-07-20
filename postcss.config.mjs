const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // Always enable optimization for Tailwind v4
      optimize: {
        minify: true,
      },
    },
  },
};

export default config;
