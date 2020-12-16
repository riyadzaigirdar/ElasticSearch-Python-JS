const express = require("express");
const router = express.Router();
const { formatter } = require("./utils");
// import connection
const client = require("./connection");
const e = require("express");
const { json } = require("express");
const ResumeParser = require("simple-resume-parser");

// just parsing the resume and sending back the parsed data
router.post("/get-resume-parsed-data", (req, res) => {
  const path = req.body.path;
  console.log(path);
  const resume = new ResumeParser(path);
  resume
    .parseToJSON()
    .then((data) => {
      // sending back the parsed data
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

// get single item start
router.get("/:id", async (req, res) => {
  let data = await client.search({
    index: "posts",
    type: "post",
    body: {
      query: {
        term: {
          _id: req.params.id,
        },
      },
    },
  });
  res.json(formatter(data.hits.hits));
});
// get single item end

// delete single item start

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  client.delete(
    {
      index: "posts",
      type: "post",
      id: req.params.id,
    },
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err }).send();
      } else {
        if (
          result.body._shards.successful == 1 &&
          result.body._shards.failed == 0
        ) {
          res.status(200).json({ message: "successfully deleted" }).send();
        } else {
          res.status(400).json({ message: "something went wrong" }).send();
        }
      }
    }
  );
});

// delete single item end

// get list of item start
// or query
router.get("/", async (req, res) => {
  let q = req.query.q;
  if (q) {
    let data = await client.search({
      index: "posts",
      type: "post",
      body: {
        query: {
          bool: {
            should: [
              {
                term: {
                  id: {
                    value: q,
                  },
                },
              },
              {
                match_phrase: {
                  title: q,
                },
              },
              {
                match_phrase: {
                  body: q,
                },
              },
            ],
          },
        },
      },
    });
    res.json(formatter(data.hits.hits));
  } else {
    let data = await client.search({
      index: "posts",
      type: "post",
      body: {
        query: {
          match_all: {},
        },
      },
    });

    res.json(formatter(data.hits.hits));
  }
});
// get list of item end
// or query

// add single item in es start
router.post("/", async (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  let body = req.body.body;
  console.log(req.body);
  // if no key is undefined then proceed else skip
  if (id && title && body) {
    let data = await client.index({
      index: "posts",
      type: "post",
      body: {
        id: id,
        title: title,
        body: body,
      },
    });

    res.json({ message: "successfully added to the database" });
  } else {
    res.json({ message: "some fields are missing" });
  }
});

// add single item in es end

module.exports = router;
