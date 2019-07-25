const mongoose = require("mongoose");

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

    return res.json({
      user,
      token: user.generateToken()
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
  const { email, username } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create(req.body);

    return res.json({ user });
  } catch (err) {
    return res.status(400).json({ error: "User registration failed" });
  }
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
