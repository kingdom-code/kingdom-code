require("dotenv").config();
// const Cache = require("@11ty/eleventy-cache-assets");
const Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API }).base(
  "appKsIxw7GrZGsYwy"
);

module.exports = () => {
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
            resolve(allDatasets);
          }
        }
      );
  });
};
