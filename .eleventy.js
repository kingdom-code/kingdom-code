const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  eleventyConfig.addFilter("isFutureDate", (dateObj)=> {
    return DateTime.fromISO(dateObj) > DateTime.local()
  })

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromISO(dateObj).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addPassthroughCopy("src/_assets");

  return {
    templateFormats: ["html", "njk"],
    pathPrefix: "/",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
      includes: "_includes"
    },
  };

}
