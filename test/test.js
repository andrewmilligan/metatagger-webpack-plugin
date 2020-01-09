const expect = require('expect.js');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const cheerio = require('cheerio');
const webpackConfig = require('./config/webpack');

describe('Test plugin', function() {
  it('Should inject tags', function() {
    const fs = new MemoryFS();
    const compiler = webpack(webpackConfig);

    compiler.outputFileSystem = fs;

    compiler.run((err, stats) => {
      if (err) throw new Error(err);
      const $ = cheerio.load(stats.compilation.assets['index.html'].source());

      expect($('meta[name="og:title"]').attr('content')).to.be('My title');
      expect($('title').first().text()).to.be('My prepended title');
      expect($('title').last().text()).to.be('Webpack App');
      expect($('h1').text()).to.be('My headline');
      expect($('h1').attr('class')).to.be('my-class');
      expect($('p').first().text()).to.be('para 1');
      expect($('p').last().text()).to.be('para 2');
    });
  });
});
