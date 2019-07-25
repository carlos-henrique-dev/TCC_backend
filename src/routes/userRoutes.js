const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const userController = require("../controllers/userController");

/* rota de login */
router.post("/login", userController.userLogin);

/* rota de cadastro */
router.post("/signup", userController.userSignup);

router.use(authMiddleware);

router.get("/me", async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);

    return res.json({ user });
  } catch (err) {
    return res.status(400).json({ error: "Can't get user information" });
  }
});

/* rota de remoção de conta */
router.delete("/:userid", userController.userLogin);

/* rota de atualização de perfil */
router.patch("/userid", userController.userLogin);

router.use(authMiddleware);

router.get("/me", async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);

    return res.json({ user });
  } catch (err) {
    return res.status(400).json({ error: "Can't get user information" });
  }
});

module.exports = router;
