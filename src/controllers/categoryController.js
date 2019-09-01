const Category = require("../models/categoryModel");

exports.getCategories = (req, res, next) => {
  Category.find()
    .exec()
    .then(issuesList => {
      const response = {
        count: issuesList.length,
        issues: issuesList
      };
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        message: "Error while fetching the categories",
        error: error
      });
    });
};

exports.getCategory = (req, res, next) => {
  const id = req.params.categoryId;

  Category.findById(id)
    .exec()
    .then(category => {
      res.status(200).json({
        message: "Success",
        category
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error! can't get the category",
        error: error
      });
    });
};

exports.postCategory = (req, res, next) => {
  const category = new Category({
    name: req.body.name
  });

  category
    .save()
    .then(result => {
      res.status(200).json({
        message: "Success",
        result
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't add a new category",
        result: {}
      });
    });
};

exports.updateCategory = (req, res, next) => {
  const id = req.params.categoryId;

  Category.updateOne({ _id: id }, { $set: { name: req.body.name } })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Success!",
        result
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update the category",
        error
      });
    });
};

exports.deleteCategory = (req, res, next) => {
  const id = req.params.categoryId;
  Category.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Success",
        result
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error! can't delete category",
        error: error
      });
    });
};
