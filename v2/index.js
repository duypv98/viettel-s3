const express = require("express");
const { handleAPIError, handleNotFoundError } = require("./middlewares/errorHandlers");
const dotenv = require("dotenv");
const router = require("./routes");

dotenv.config({ path: __dirname + "/.env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(handleAPIError);
app.use(handleNotFoundError);

app.listen(3001, () => {
  console.log(`API is running on port ${3001}`);
})
