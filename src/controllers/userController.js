const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Image = require('../models/imagesModel');
const Issue = require('../models/issuesModel');

// Carrega o model de Usuário
require('../models/user');

const User = mongoose.model('User');

/* controle de login
    Params:
    result:
*/
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    return res.json({
      user,
      token: user.generateToken({ ...user }),
    });
  } catch (err) {
    return res.status(400).json({ error: 'User authentication failed' });
  }
};

/* controle de cadastro
    Params:
    result:
*/
exports.userSignup = async (req, res, next) => {
  if (await User.findOne({ email: req.body.email })) {
    return res.status(409).json({ error: 'Usuário já existente' });
  }

  const {
    originalname: name, size, key, location: url = '',
  } = req.file;

  const image = await Image.create({
    name,
    size,
    key,
    url,
  });

  const user = new User({
    name: req.body.name,
    avatar: image,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Conta criada com sucesso',
        createdUser: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

/* controle de remoção de conta
    Params:
    result:
*/
exports.userDelete = (req, res, next) => {
  User.findById(req.params.userid)
    .exec()
    .then((user) => {
      Issue.find({ authorId: user._id })
        .then(async (issues) => {
          for (issue of issues) {
            for (image of issue.images) {
              const img = await Image.findById(image);
              await img.remove();
            }
            Issue.deleteOne({ _id: issue._id }).exec();
          }
        })
        .then(async () => {
          const avatar = await Image.findById(user.avatar);
          await avatar.remove();
          User.deleteOne({ _id: user._id })
            .exec()
            .then(() => {
              res.status(200).json({ message: 'conta excluída com sucesso' });
            });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: 'erro ao excluir a conta' });
    });
};

/* controle de atualização de perfil
    Params:
    result:
*/
exports.userUpdate = async (req, res, next) => {
  const { name = null, password = null } = req.body;
  let avatar = null;
  if (req.file !== undefined) {
    const {
      originalname: name, size, key, location: url = '',
    } = req.file;
    avatar = await Image.create({
      name,
      size,
      key,
      url,
    });
  }

  if (avatar === null && name === null && password === null) {
    return res.status(400).json({ message: 'Nenhum dado para atualizar' });
  }

  User.findById(req.params.userid)
    .exec()
    .then(async (user) => {
      if (avatar !== null) {
        const oldAvatar = await Image.findById(user.avatar);
        await oldAvatar.remove();
      }

      const newUser = {};
      if (avatar !== null) {
        newUser.avatar = avatar;
      }
      if (name !== null) {
        newUser.name = name;
      }
      if (password !== null) {
        const hashedPassword = await bcrypt.hash(password, 8);
        newUser.password = hashedPassword;
      }

      User.findOneAndUpdate({ _id: req.params.userid }, { $set: newUser }, { new: true })
        .exec()
        .then((result) => {
          res.status(200).json({
            message: 'usuário atualizado',
            user: result,
            token: jwt.sign(
              {
                id: result._id,
                name: result.name,
                email: result.email,
              },
              'secret',
              {
                expiresIn: 86400,
              },
            ),
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Erro ao tentar atualizar o perfil',
        err: err.message,
      });
    });
};
