const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { USER } = require("../config/db.config");
const { user } = require("../models");
const db = require("../models");
const User = db.user;

/**
 * Creation d'un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.register = (req, res, next) => {
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };
      User.create(user)
        .then((user) => {
          res.status(201).send({
            id: user.id,
            name: user.name,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Problème route register !",
      });
    });
};

/**
 * Connection d'un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = (req, res, next) => {
  const user = {
    email: req.body.email,
  };
  User.findOne({ where: { email: user.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            } else {
              res.status(200).json({
                id: user.id,
                name: user.name,
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .json({ error: console.log("Erreur route login !") });
          });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: console.log("problème route login") })
    );
};

exports.getUserData = (req, res, next) => {
  const user = req.params.id;
  console.log(req.params.id);
  User.findOne({ where: { id: user } })
    .then((user) => {
      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email
      })
    })
    .catch((err) => {
      res.status(500).json({ error: console.log('Utilisateur introuvable !') })
    });
  
},

/**
 * Mise à jour d'un compte utilisateur.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.update = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };
      User.update(user, { where: { email: req.body.email } })
        .then((user) => {
          res.status(201).send({
            name: user.name,
            email: user.email,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Problème route register !",
      });
    });
};

/**
 * Suppression d'un utilisateur
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = (req, res) => {
  User.destroy({ where: { id: req.body.id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Utilisateur supprimé!",
        });
      } else {
        res.send({
          message: `Impossible de supprimer l'utilisateur!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur serveur, suppression utilisateur impossible !",
      });
    });
};
