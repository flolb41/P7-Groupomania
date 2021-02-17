const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require('./app/routes/user.routes');
const messageRoutes = require("./app/routes/message.routes");
const mysql = require('mysql2');
const app = express();
const helmet = require('helmet');

/**
 * Création de la connection avec la base de données.
 */
db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "groupomania",
});

/**
 * Headers autorisants les types de requêtes.
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(helmet());

/**
 * Départ des routes de l'API.
 */ 
app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);

module.exports = app;