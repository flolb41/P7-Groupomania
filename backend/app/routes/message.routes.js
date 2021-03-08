/**
 * Fichier de listing des routes Message.
 */
const express = require("express");
const messageCtrl = require("../controllers/message.ctrl.js");
const router = express.Router();

/**
 * Créer un nouveau message.
 */ 
router.post("/", messageCtrl.create);

/**
 * Modifier un message.
 */
router.put("/update/:id", messageCtrl.update);

/**
 * Retrouver tous les messages.
 */ 
router.get("/all", messageCtrl.findAll);

/**
 * Supprimer un message grâce à son id.
 */ 
router.delete("/delete/:id", messageCtrl.delete);

/**
 * Supprimer tous les messages.
 */ 
router.delete("/", messageCtrl.deleteAll);

module.exports = router;
