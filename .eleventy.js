const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  eleventyConfig.addFilter("isFutureDate", (dateObj)=> {
    return DateTime.fromISO(dateObj) > DateTime.local()
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

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
