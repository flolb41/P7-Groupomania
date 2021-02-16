const express = require("express");
const messageCtrl = require("../controllers/message.ctrl.js");
const router = express.Router();

// Create a new Message
router.post("/", messageCtrl.create);

// Retrieve all messages
router.get("/all", messageCtrl.findAll);

// Retrieve all published messages
router.get("/published", messageCtrl.findAllPublished);

// Retrieve a single Message with id
router.get("/:id", messageCtrl.findOne);

// Update a Message with id
router.put("/:id", messageCtrl.update);

// Delete a Message with id
router.delete("/delete/:id", messageCtrl.delete);

// Delete all messages
router.delete("/", messageCtrl.deleteAll);

module.exports = router;
