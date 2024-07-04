const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  let allUrl = await URL.find({});
  return res.render("home", {
    urls: allUrl,
  });
});

module.exports = router;
