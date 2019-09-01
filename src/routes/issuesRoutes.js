const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");

const multer = require("multer");
const multerConfig = require("../config/multer");

const issuesController = require("../controllers/issuesController");

router.get("/", issuesController.getIssues);

router.get("/:issueId", issuesController.getIssue);

router.post(
  "/",
  multer(multerConfig).single("file"),
  issuesController.postIssue
);

router.patch("/:issueId", issuesController.updateIssue);

router.delete("/:issueId", issuesController.deleteIssue);

module.exports = router;
