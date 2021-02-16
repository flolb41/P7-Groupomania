const express = require("express");
const router = express.Router();
const userCtrl = require('../controllers/user.ctrl.js')

// creation d'un utilisateur
router.post("/register", userCtrl.register); 

// connection d'un utilisateur
router.post("/login", userCtrl.login);

// modification d'un utilisateur
router.put('/update', userCtrl.update);

// supression d'un utilisateur
router.delete("/delete/", userCtrl.delete);

module.exports = router;
