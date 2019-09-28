const router = require("express").Router();

const reportController = require("../controllers/reportsController");

router.get("/bycategory", reportController.reportByCategory);

router.get("/byCity", reportController.reportByCity);

router.get("/byRegion", reportController.reportByRegion);

module.exports = router;
