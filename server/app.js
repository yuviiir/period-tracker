const { response } = require("express");
const express = require("express");
const app = express();

require("dotenv").config();

const { verificationHandler } = require("./jwt");

const PORT = process.env.PORT || 3000;

//ROUTER TO API
const historyRouter = require("./routes/history");
const journalRouter = require("./routes/journal");
const cycleRouter = require("./routes/cycle");

app.use(express.json());

//Authentication middleware
app.use(verificationHandler);

app.use("/cycle", cycleRouter);
app.use("/history", historyRouter);
app.use("/journal", journalRouter);

app.all("*", (req, res) => {
  res.status(400).send("<h1> PAGE NOT FOUND! </h1>");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
