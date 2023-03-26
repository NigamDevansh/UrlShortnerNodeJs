const shortid = require("shortid");
const URL = require("../models/urlSchema");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    //this req.user is comming from middleware
    createdBy: req.user._id,
  });

  // const allUrl = await URL.find({createdBy: req.user._id});
  return res.render("home", {
    id: shortID,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleRedirectURL(req, res) {
  // https://www.geeksforgeeks.org/express-js-req-params-property/ this gives the naame to the part of url after collon 
  // which makes it easy to get the value rather than getting the whole url and searching the required thing
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
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectURL,
};
