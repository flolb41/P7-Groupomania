const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require('./app/routes/user.routes');
const messageRoutes = require("./app/routes/message.routes");
const mysql = require('mysql2');
const app = express();
const helmet = require('helmet');

db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "groupomania",
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// simple route
app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);

module.exports = app;