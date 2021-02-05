const path = require('path');
const pack = require('./package.json');

const event = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : '';
const isProd = event === 'build';

const root = {
  docs: (slug) => path.resolve(__dirname, `docs/${slug}`),
  assets: (slug) => path.resolve(__dirname, `docs/assets/${slug}`),
};

module.exports = {
  publicPath: isProd ? `/${pack.name}` : '/',
  chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add(root.docs('main.js'))
      .end();
    config.resolve.alias
      .set('@', root.docs(''))
      .set('fonts', root.assets('fonts'))
      .set('images', root.assets('images'))
      .set('styles', root.assets('styles'));
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~styles/base/variables.scss";',
      },
    },
  },
};
