const Image = require("../models/imagesModel");
const Issue = require("../models/issuesModel");

exports.getIssues = async (req, res, next) => {
  Issue.find()
    .exec()
    .then(issues_list => {
      res.status(200).json({
        count: issues_list.length,
        issues: issues_list
      });
    })
    .catch(error => {
      res.status(500).json({
        error: "erro ao buscar issues" + error
      });
    });
};

exports.getIssue = (req, res, next) => {
  Issue.findById(req.params.issueId)
    .exec()
    .then(issue => {
      if (issue !== null) {
        res.status(200).json({
          message: "Success!",
          issue
        });
      } else {
        res.status(400).json({
          message: "Invalid ID"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error getting issue" + error
      });
    });
};

exports.postIssue = async (req, res, next) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const image = await Image.create({
    name,
    size,
    key,
    url
  });

  const issue = new Issue({
    category: req.body.category,
    authorId: req.body.authorId,
    authorName: req.body.authorName,
    images: image._id,
    address: req.body.address,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    description: req.body.description
  });

  issue
    .save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({
        error: "erro ao adicionar issue" + error
      });
    });
};

/* 
atualiza a issue, a requisição deve seguir este modelo:
[
	{
		"propName": "nome do campo a ser alterado",
		"value": "valor que deverá substituir o atual"
	}
]
*/
exports.updateIssue = (req, res, next) => {
  const updateOperations = {};
  for (const operations of req.body) {
    updateOperations[operations.propName] = operations.value;
  }

  Issue.updateOne({ _id: req.params.issueId }, { $set: updateOperations })
    .exec()
    .then(updatedIssue => {
      if (updatedIssue.nModified !== 0) {
        res.status(200).json({
          message: "Success",
          updatedIssue
        });
      } else {
        res.status(400).json({
          message: "Invalid ID"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "erro ao adicionar issue" + error
      });
    });
};

exports.deleteIssue = async (req, res, next) => {
  Issue.findById(req.params.issueId)
    .exec()
    .then(async result => {
      const image = await Image.findById(result.images);
      await image.remove();

      Issue.deleteOne({ _id: req.params.issueId })
        .exec()
        .then(result => {
          res.status(200).json({
            message: "Success",
            result
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error trying to delete item" + error
      });
    });
};

exports.addComment = (req, res, next) => {
  res.status(200).json({
    message: "Adicionando comentário"
  });
};

exports.deleteComment = (req, res, next) => {
  res.status(200).json({
    message: "Apagando comentário" + req.body.commentId
  });
};

exports.addSupport = (req, res, next) => {
  Issue.findById({ _id: req.params.issueId }, { voters: 1 })
    .exec()
    .then(result => {
      Issue.updateOne(
        { _id: req.params.issueId },
        { $push: { voters: req.body.voter } }
      )
        .exec()
        .then(result => {
          res.status(200).json({
            support: result,
            message: "Adicionando um voto de suporte"
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Erro ao votar" + error
      });
    });
};

exports.removeSupport = (req, res, next) => {
  Issue.findById({ _id: req.params.issueId }, { voters: 1 })
    .exec()
    .then(result => {
      if (result.voters.length > 0) {
        Issue.updateOne(
          { _id: req.params.issueId },
          { $pull: { voters: { $in: [req.body.voter] } } }
        )
          .exec()
          .then(result => {
            res.status(200).json({
              support: result,
              message: "Retirado um voto de suporte"
            });
          });
      } else {
        res.status(200).json({
          support: {},
          message: "Nenhum voto para retirar"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Erro ao votar" + error
      });
    });
};
