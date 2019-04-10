const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  eleventyConfig.addFilter("isFutureDate", (dateObj)=> {
    return DateTime.fromISO(dateObj) > DateTime.local()
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromISO(dateObj).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addFilter("eventsInCity", (events, city) => {
    console.log('doing something', city);
    return events.filter(e => e.city == city);
  });

  eleventyConfig.addPassthroughCopy("src/_assets");

  eleventyConfig.addCollection("cities", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/cities\//) !== null;
    });
  });

  return {
    templateFormats: ["html", "njk", "md"],
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
