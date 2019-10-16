const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");

const multer = require("multer");
const multerConfig = require("../config/multer");

const issuesController = require("../controllers/issuesController");

/* rotas principais dos problemas */
router.get("/", issuesController.getIssues);
router.get("/:issueId", issuesController.getIssue);

router.post(
  "/",
  multer(multerConfig).array("files", 3),
  issuesController.postIssue
);
router.patch("/:issueId", issuesController.updateIssue);
router.delete("/:issueId", issuesController.deleteIssue);

/* rotas para os comentários */
router.post("/comments/:issueId", issuesController.addComment);
router.delete("/comments/:issueId/", issuesController.deleteComment);

/* rotas para os apoios */
router.post("/support/add/:issueId", issuesController.addVote);
router.post("/support/remove/:issueId/", issuesController.removeVote);

/* rota filtrar por categoria */
router.get("/category/:categoryId", issuesController.findByCategory);
/* rota filtrar por usuário */
router.get("/user/:userId", issuesController.findByUser);

module.exports = router;
