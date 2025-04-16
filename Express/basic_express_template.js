const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

// !! EXPLAIN NEXT FUNCTION IN MIDDLEWARE !!

app.use(morgan("dev"));

app.use(bodyParser.json());

app.listen(3000, (e) => {
  console.log("Server is running on port 3000");
});
