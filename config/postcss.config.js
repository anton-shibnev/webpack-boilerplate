module.exports = {
  plugins: {
    autoprefixer: { 
      overrideBrowserslist: [
        'last 2 versions',
        'iOS >= 8'
      ] 
    },
    cssnano: {
      safe: true,
      normalizeUrl: false,
    },
  },
};
