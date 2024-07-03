const express = require("express");
const URLroute = require("./routes/url");
const { connectToMongoDB } = require("./connection");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB(
  "mongodb+srv://jpvelloor:brototype@url-shortner.mazujup.mongodb.net/?retryWrites=true&w=majority&appName=URL-shortner"
)
  .then(() => {
    console.log("Conneted to MongoDB");
  })
  .catch(() => {});

app.get("/test", (req, res) => {
  return res.end("");
});
app.use(express.json());
app.use("/", URLroute);

app.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}`);
});
