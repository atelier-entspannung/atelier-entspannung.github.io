const { EleventyRenderPlugin } = require("@11ty/eleventy");


module.exports = function (eleventyConfig) {    
    eleventyConfig.addPassthroughCopy('src/styles');
    eleventyConfig.addWatchTarget('src/styles');
    eleventyConfig.addPassthroughCopy('src/images');
    eleventyConfig.addWatchTarget('src/images');
    
    eleventyConfig.addPlugin(EleventyRenderPlugin);

    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
  };