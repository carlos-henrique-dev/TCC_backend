const Category = require("../models/categoryModel");
const Issue = require("../models/issuesModel");

exports.reportByCategory = (req, res, next) => {
  Category.find()
    .exec()
    .then(async categories => {
      const report = [];
      for (item of categories) {
        const result = await Issue.countDocuments({
          category: item._id
        }).exec();
        report.push({
          category: item.name,
          amount: result
        });
      }
      res.status(200).json({ message: "relatório", report });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "erro ao gerar o relatório", error: err.message });
    });
};
