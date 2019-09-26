const router = require("express").Router();

const reportController = require("../controllers/reportsController");

router.get("/bycategory", reportController.reportByCategory);

module.exports = router;
