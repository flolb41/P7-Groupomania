/**
 * Fichier de listing des routes Utilisateurs.
 */
const express = require("express");
const router = express.Router();
const userCtrl = require('../controllers/user.ctrl.js')

/**
 * Création d'un utilisateur.
 */ 
router.post("/register", userCtrl.register); 

/**
 * Connection d'un utilisateur.
 */ 
router.post("/login", userCtrl.login);

/**
 * Récupération données utilisateur
 */
router.get("/get/", userCtrl.getUserData);

/**
 * Modification d'un utilisateur.
 */ 
router.put('/update', userCtrl.update);

/**
 * Supression d'un utilisateur.
 */ 
router.delete("/delete/", userCtrl.delete);

module.exports = router;
