const Category = require('../models/categoryModel');

exports.getCategories = (req, res, next) => {
  Category.find()
    .exec()
    .then((categoriesList) => {
      const response = {
        count: categoriesList.length,
        categories: categoriesList,
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error while fetching the categories',
        error,
      });
    });
};

exports.getCategory = (req, res, next) => {
  const id = req.params.categoryId;

  Category.findById(id)
    .exec()
    .then((category) => {
      res.status(200).json({
        message: 'Success',
        category,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error! can't get the category",
        error,
      });
    });
};

exports.postCategory = (req, res, next) => {
  const { name = '', code = '' } = req.body;

  if (name !== '' && code !== '') {
    const category = new Category({
      name,
      code,
    });

    category
      .save()
      .then((result) => {
        res.status(200).json({
          message: 'Success',
          result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Couldn't add a new category",
          result: {},
        });
      });
  } else {
    res.status(400).json({
      message: 'Dados inválidos',
      result: {},
    });
  }
};

exports.updateCategory = (req, res, next) => {
  if (req.body.length > 0) {
    const updateOperations = {};

    for (const operations of req.body) {
      if (
        operations.propName !== ''
        && operations.propName !== undefined
        && operations.value !== ''
        && operations.value !== undefined
      ) {
        updateOperations[operations.propName] = operations.value;
      }
    }

    Category.updateOne({ _id: id }, { $set: updateOperations })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: 'Success!',
          result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Erro ao atualizar a cateoria',
          error,
        });
      });
  } else {
    res.status(400).json({
      message: 'Nenhum campo para atualizar',
    });
  }
};

exports.deleteCategory = (req, res, next) => {
  const id = req.params.categoryId;
  Category.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Success',
        result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error! can't delete category",
        error,
      });
    });
};
