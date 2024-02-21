const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const wordRoute = require("./routes/words");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = 8000;

app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());
app.use(cors());
app.use("/words", wordRoute);

const DB_URL =
  "mongodb+srv://nurrsserkul:nurrs123@cluster0.yfqy8rx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log("Backend server is running at: ", port);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log",
  );
});

// it should be in the end
app.use(function (req, res) {
  return res.status(404).json({ message: "Endpoint not found" });
});
