const dayjs = require("dayjs");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const dateFormat = (d, format) => {
  return dayjs(d).format(format);
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("isFutureDate", (dateObj) => {
    return dayjs(dateObj).isAfter(dayjs());
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return dateFormat(dateObj, "YYYY-MM-DD");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return dateFormat(dateObj, "ddd, D MMMM YYYY");
  });

  eleventyConfig.addFilter("formatDate", (dateObj, format) => {
    return dateFormat(dateObj, format);
  });

  eleventyConfig.addFilter("eventsInCity", (events, city) => {
    return events.filter((e) => e.city == city);
  });

  eleventyConfig.addFilter("orphanWrap", (str) => {
    if (str) {
      let splitSpace = str.split(" ");
      let after = "";
      if (splitSpace.length > 2) {
        after += " ";

        let lastWord = splitSpace.pop();
        let secondLastWord = splitSpace.pop();

        after += `${secondLastWord}&nbsp;${lastWord}`;
      }

      return splitSpace.join(" ") + after;
    } else {
      return str;
    }
  });

  eleventyConfig.addCollection("cities", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/cities\/.*\.md$/) !== null;
    });
  });

  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/blog\/.*\.md$/) !== null;
    });
  });

  // Watch assets folder for changes
  eleventyConfig.addWatchTarget("./src/_assets");

  // Copy these assets straight across
  eleventyConfig.addPassthroughCopy({ "./src/_assets/misc": "_assets/misc" });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("dist/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    templateFormats: ["html", "njk", "md", "11ty.js"],
    pathPrefix: "/",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
      includes: "_includes",
    },
  };
};
