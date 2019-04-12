const { DateTime } = require("luxon");
const fs = require("fs");

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

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
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
