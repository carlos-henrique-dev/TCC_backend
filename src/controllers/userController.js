const mongoose = require("mongoose");

// Carrega o model de Usuário
require("../models/user");

const User = mongoose.model("User");

/* controle de login
    Params: 
    result:
*/
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const { name, _id } = user._doc;

    return res.json({
      name,
      _id,
      token: user.generateToken({ ...user })
    });
  } catch (err) {
    return res.status(400).json({ error: "User authentication failed" });
  }
};

/* controle de cadastro
    Params: 
    result:
*/
exports.userSignup = async (req, res, next) => {
  if (await User.findOne({ email: req.body.email })) {
    return res.status(409).json({ error: "Usuário já existente" });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Conta criada com sucesso",
        createdUser: {
          name: result.name,
          email: req.body.email,
          _id: result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

/* controle de remoção de conta
    Params: 
    result:
*/
exports.userDelete = (req, res, next) => {};

/* controle de atualização de perfil
    Params: 
    result:
*/
exports.userUpdate = (req, res, next) => {};
