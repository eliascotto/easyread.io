const path = require('path');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

module.exports = withCSS(withFonts({
  webpack: (config) => {
    config.resolve.modules.push(path.resolve(__dirname + '/src'));
    return config;
  },
}));
