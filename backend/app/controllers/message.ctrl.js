const { message } = require("../models/message.model");
const db = require("../models");
const { user } = require("../models");
const Message = db.message;

/**
 * Creation d'un message
 *  */
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide!",
    });
    return;
  }
  const message = {
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    published: true,
  };
  Message.create(message)
    .then((message) => {
      res.send(message);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};

/**
 * Modifier un message
 */
exports.update = (req, res) => {
  let message = {
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  };
  //  Vérification du contenu du nouveau message
  if (!message.content) {
    return res.status(400).send({
      message: "Le message ne peut pas être vide",
    });
  }
  // Trouver le message et le modifier
  Message.update(message, {
    where: { id: message.id }
  })
    .then((message) => {
      if (!message) {
        return res.status(404).send({
          message: "id message introuvable " + req.body.id,
        });
      }
      res.send(message);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Id du message introuvable " + req.body.id,
        });
      }
      return res.status(500).send({
        message: "Erreur de modification avec l'Id " + req.body.id,
      });
    });
};

/**
 * Retrouver tous les messages
 *  */
exports.findAll = (req, res) => {
  Message.findAll({
    include: [
      {
        model: db.user,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
      console.log(err);
    });
};

/**
 * Supression d'un message par son id.
 *  */
exports.delete = (req, res) => {
  const id = req.body.id;
  Message.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Message supprimé avec succés!",
        });
      } else {
        res.send({
          message: `Suppression impossible du message avec l'id=${id}. Le message est peut-être introuvable!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur 500 : supression impossible id=" + id,
      });
    });
};

/**
 * Supprimer tous les messages.
 *  */
exports.deleteAll = (req, res) => {
  Message.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Messages were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all messages.",
      });
    });
};
