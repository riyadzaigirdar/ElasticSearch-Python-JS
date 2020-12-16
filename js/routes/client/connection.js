var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
  host: "localhost:9203",
  log: "trace",
  apiVersion: "7.2", // use the same version of your Elasticsearch instance
});

module.exports = client;
