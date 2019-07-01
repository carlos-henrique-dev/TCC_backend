const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControler");

/* rota de login */
router.post("/login", userController.userLogin);

/* rota de cadastro */
router.post("/signup", userController.userLogin);

/* rota de remoção de conta */
router.delete("/:userid", userController.userLogin);

/* rota de atualização de perfil */
router.patch("/userid", userController.userLogin);
