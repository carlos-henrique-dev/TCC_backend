const Category = require("../models/categoryModel");
const Issue = require("../models/issuesModel");

exports.reportByCategory = (req, res, next) => {
  Category.find()
    .exec()
    .then(async categories => {
      const report = [];
      for (item of categories) {
        const result = await Issue.countDocuments({
          categoryId: item._id
        }).exec();

        const issues = await Issue.find({ categoryId: item._id }).exec();

        const issuesLocation = issues.map(issue => ({
          latitude: issue.location.coordinates[0],
          longitude: issue.location.coordinates[1]
        }));
        report.push({
          category: item.name,
          code: item.code,
          issuesLocation,
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

exports.reportByCity = (req, res, next) => {
  const query = Issue.find();

  query
    .where("city")
    .equals(req.body.city)
    .exec()
    .then(response => {
      res.status(200).json({
        count: response.length,
        response
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.reportByRegion = async (req, res, next) => {
  res.status(200).json({ message: "Rota em desenvolvimento" });
};
