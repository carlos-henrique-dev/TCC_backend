const Category = require("../models/categoryModel");
const Issue = require("../models/issuesModel");
const mongoose = require("mongoose");

exports.reportByCategory = (req, res, next) => {
  Category.find()
    .exec()
    .then(async categories => {
      const report = [];
      for (item of categories) {
        const result = await Issue.countDocuments({
          categoryId: item._id
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
