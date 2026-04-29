require('dotenv').config();
const express = require("express");
const connectDB = require('./config/db');
const fetchAndStore = require('./services/fetchData');

const app = express();

connectDB();

fetchAndStore();

app.use("/posts", require("./routes/postRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('server is running on port', PORT))