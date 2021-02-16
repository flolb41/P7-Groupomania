const { message } = require('../models/message.model')
const db = require("../models");
const Message = db.message;
const Op = db.Sequelize.Op;

// Create and Save a new Message
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide!",
    });
    return;
  }
  // Create a Message
  const message = {
    name: req.body.name,
    title: req.body.title,
    content: req.body.content,
    published: true
  };
  console.log(message)
  // Save Message in the database
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

// Retrieve all Messages from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Message.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving messages.",});
      console.log(err);
    });
};

// Find a single Message with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Message.findOne(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Message with id=" + id,
      });
    });
};

// Update a Message by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Message.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Message was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Message with id=${id}. Maybe Message was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Message with id=" + id,
      });
    });
};

// Supression d'un message par son id.
exports.delete = (req, res) => {
  const id = req.body.id;
  console.log(id)
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

// Delete all Messages from the database.
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

// Find all published Messages
exports.findAllPublished = (req, res) => {
  Message.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};
