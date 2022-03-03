require("dotenv").config();
const { AssetCache } = require("@11ty/eleventy-cache-assets");
const Airtable = require("airtable");

if (!process.env.AIRTABLE_API) {
  console.error("🚨 Oh no! No Airtable API Key in the env…");
  return false;
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API }).base(
  "appKsIxw7GrZGsYwy"
);

module.exports = () => {
  let asset = new AssetCache("airtable_jobs");

  if (asset.isCacheValid("1d")) {
    console.log("Serving jobs from the cache…");
    return asset.getCachedValue();
  }

  return new Promise((resolve, reject) => {
    let allDatasets = [];

    base("Jobs")
      .select({
        view: "Live",
        sort: [{ field: "ClosingDate", direction: "asc" }],
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
