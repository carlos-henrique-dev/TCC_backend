const mongoose = require("mongoose");

const Image = require("../models/imagesModel");

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

    const { avatar, name, _id } = user;
    return res.json({
      avatar,
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

  const { originalname: name, size, key, location: url = "" } = req.file;
  console.log("file", req.file);

  const image = await Image.create({ name, size, key, url });

  const user = new User({
    name: req.body.name,
    avatar: image,
    email: req.body.email,
    password: req.body.password
  });
  user
    .save()
    .then(result => {
      res.status(201).json({
        message: "Conta criada com sucesso",
        createdUser: {
          result
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
exports.userUpdate = async (req, res, next) => {
  const { name = null } = req.body;
  let avatar = null;
  if (req.file !== undefined) {
    const { originalname: name, size, key, location: url = "" } = req.file;
    console.log("re file", req.file);
    avatar = await Image.create({ name, size, key, url });
  }

  if (avatar === null && name === null) {
    return res.status(400).json({ message: "Nenhum dado para atualizar" });
  }

  User.findById(req.params.userid)
    .exec()
    .then(async user => {
      if (avatar !== null) {
        const oldAvatar = await Image.findById(user.avatar);
        await oldAvatar.remove();
      }

      const newUser = {};
      if (avatar !== null) {
        newUser.avatar = avatar;
      }
      if (name !== null) {
        newUser["name"] = name;
      }

      User.updateOne({ _id: req.params.userid }, { $set: newUser })
        .exec()
        .then(result => {
          res.status(200).json({
            message: "usuário atualizado",
            newUser
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        message: "Erro ao tentar atualizar o perfil",
        err: err.message
      });
    });
};
