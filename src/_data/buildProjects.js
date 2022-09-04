require("dotenv").config();
const Airtable = require("airtable");

const { AssetCache } = require("@11ty/eleventy-cache-assets");

if (!process.env.AIRTABLE_API) {
  console.error("🚨 Oh no! No Airtable API in the env…");
  return false;
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API }).base(
  "appKsIxw7GrZGsYwy"
);

module.exports = () => {
  let asset = new AssetCache("airtable_build_projects");

  if (asset.isCacheValid("1d")) {
    console.log("Serving BUILD projects from the cache…");
    return asset.getCachedValue();
  }

  return new Promise((resolve, reject) => {
    let allDatasets = [];

    base("BUILD Projects")
      .select({
        view: "Active",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allDatasets.push({
              id: record._rawJson.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            asset.save(allDatasets, "json");
            resolve(allDatasets);
          }
        }
      );
  });
};
