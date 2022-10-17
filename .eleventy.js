const dayjs = require("dayjs");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);
const pluginRss = require("@11ty/eleventy-plugin-rss");
const inspect = require("util").inspect;

const collections = require("./utils/collections.js");
const filters = require("./utils/filters.js");
const shortcodes = require("./utils/shortcodes.js");

const dateFormat = (d, format) => {
  return dayjs(d).format(format);
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  eleventyConfig.addFilter("debug", (content) => `${inspect(content)}`);

  eleventyConfig.addFilter("futureMeetups", (collection) => {
    return collection.filter(function (item) {
      return dayjs(item.data.date).isSameOrAfter(dayjs());
    });
  });

  eleventyConfig.addFilter("pastEvent", (collection) => {
    return collection.filter(function (item) {
      return dayjs(item.data.date).isBefore(dayjs());
    });
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

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  eleventyConfig.addCollection("cities", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/cities\/.*\.md$/) !== null;
    });
  });

  eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob(["./src/build/projects/**/*.md"]);
  });

  eleventyConfig.addCollection("meetups", function (collection) {
    return collection.getFilteredByGlob(["./src/meetup/**/*.md"]);
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

  // Watch assets folder for changes
  eleventyConfig.addWatchTarget("./src/_assets");

  // Copy these assets straight across
  eleventyConfig.addPassthroughCopy({ "./src/_assets/img": "_assets/img" });
  eleventyConfig.addPassthroughCopy({ "./src/_assets/misc": "_assets/misc" });
  // eleventyConfig.addPassthroughCopy({ "./src/_assets/vid": "_assets/misc" });
  // eleventyConfig.addPassthroughCopy({ "./src/_redirects": "_redirects" });

  eleventyConfig.browserSyncConfig = {
    https: true,
  };

  return {
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
      includes: "_includes",
    },
  };
};
