const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).send({ error: 'URL is required' });
  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: url,
    visitHistor: [],
    createdBy: req.user._id,
  });

  return res.render('home', {
    id: shortId,
  });
}

async function handleRedirectURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectURL);
}

async function handleAnalyticsDetails(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    Analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleAnalyticsDetails,
  handleRedirectURL,
};
