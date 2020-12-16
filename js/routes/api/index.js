const express = require("express");
const router = express.Router();

// formatter
const { formatter } = require("../client/utils");
// fetch
const fetch = require("node-fetch");
const { response } = require("express");

// get list of docs in index posts
router.get("/", (req, res) => {
  url = "http://localhost:9203/posts/post/_search/";
  const headers = {
    "Content-type": "application/json",
  };
  body = JSON.stringify({ query: { match_all: {} } });
  fetch(url, {
    method: "POST",
    headers,
    body,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.status(200).json(formatter(data.hits.hits)).send();
    })
    .catch((err) => console.error(err));
});

// GET single item
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const url = `https://localhost:9003/posts/post/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const item = data;
      res.json(item);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// DELETE single item
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const url = `https://localhost:9003/posts/post/${id}`;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.json({ message: "successfully deleted item" });
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// post a item
router.post("/", (req, res) => {
  body = JSON.stringify(req.body);
  url = "http://localhost:9203/posts/post/";
  headers = {
    "Content-type": "application/json",
  };
  fetch(url, {
    method: "POST",
    headers,
    body,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  res.status(201).json({ message: "successfully added item" }).send();
});

module.exports = router;
