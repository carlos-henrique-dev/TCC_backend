const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth');
const userController = require('../controllers/userController');

const multerConfig = require('../config/multer');

// Carrega o model de Usuário
require('../models/user');

const User = mongoose.model('User');

/* rota de login */
router.post('/login', userController.userLogin);

/* rota de cadastro */
router.post('/signup', multer(multerConfig).single('avatar'), userController.userSignup);

/* rota de remoção de conta */
router.delete('/:userid', userController.userDelete);

/* rota de atualização de perfil */
router.patch('/:userid', multer(multerConfig).single('avatar'), userController.userUpdate);

router.post('/forgotPassword', userController.userForgotPassword);
router.post('/resetPassword', userController.userResetPassword);

// router.use(authMiddleware);

router.get('/me', async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);

    return res.json({ user });
  } catch (err) {
    return res.status(400).json({ error: "Can't get user information" });
  }
});

module.exports = router;
