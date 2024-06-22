const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const tokenRoutes = require("./routes/tokenRoutes");

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use("/api", tokenRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error occured");
    process.exit(1);
  }
  console.log(`Listening on port ${PORT}`);
});
