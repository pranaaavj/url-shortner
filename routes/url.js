const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirectURL,
  handleAnalyticsDetails,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectURL);
router.get("/analytics/:shortId", handleAnalyticsDetails);

module.exports = router;
