const dayjs = require("dayjs");
const fs = require("fs");

const dateFormat = (d, format) => {
  return dayjs(d).format(format);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("isFutureDate", (dateObj)=> {
    return dayjs(dateObj).isAfter(dayjs())
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return dateFormat(dateObj, 'YYYY-MM-DD');
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return dateFormat(dateObj, 'ddd, D MMMM YYYY');
  });

  eleventyConfig.addFilter("formatDate", (dateObj, format) => {
    return dateFormat(dateObj, format)
  })

  eleventyConfig.addFilter("eventsInCity", (events, city) => {
    return events.filter(e => e.city == city);
  });

  eleventyConfig.addPassthroughCopy("src/_assets/_img");

  eleventyConfig.addCollection("cities", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/cities\/.*\.md$/) !== null;
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
