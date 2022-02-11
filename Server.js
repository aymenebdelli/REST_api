const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()


const app = express()

app.use(express.json())
app.use(require("./routes"))

//mongoose set up

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('mongoDB connected...');
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
