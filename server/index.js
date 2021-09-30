const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const mongoose = require("mongoose");
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  );
