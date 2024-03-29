const Image = require('../models/imagesModel');
const Issue = require('../models/issuesModel');

exports.getIssues = async (req, res, next) => {
  Issue.find()
    .exec()
    .then((issues_list) => {
      res.status(200).json({
        count: issues_list.length,
        issues: issues_list.sort(
          (item1, item2) => new Date(item2.postedAt - new Date(item1.postedAt)),
        ),
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: `erro ao buscar issues${error}`,
      });
    });
};

exports.getIssue = (req, res, next) => {
  Issue.findById(req.params.issueId)
    .exec()
    .then((issue) => {
      if (issue !== null) {
        res.status(200).json({
          message: 'Success!',
          issue,
        });
      } else {
        res.status(400).json({
          message: 'Invalid ID',
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error getting issue${error}`,
      });
    });
};

exports.postIssue = (socket) => async (req, res, next) => {
  if (req.files !== undefined) {
    const images = [];

    for (item of req.files) {
      const {
        originalname: name, size, key, location: url = '',
      } = item;

      const image = await Image.create({
        name,
        size,
        key,
        url,
      });
      images.push(image);
    }
    const {
      authorId,
      authorName,
      authorAvatar,
      categoryId,
      street,
      neighborhood,
      city,
      latitude,
      longitude,
      description,
    } = req.body;

    if (
      authorId === undefined
      || authorName === undefined
      || categoryId === undefined
      || street === undefined
      || neighborhood === undefined
      || city === undefined
      || latitude === undefined
      || longitude === undefined
      || description === undefined
    ) {
      for (item of images) {
        await item.remove();
      }
      res.status(400).json({
        message: 'Dados inválidos',
      });
    } else {
      const issue = new Issue({
        authorId,
        authorName,
        authorAvatar,
        categoryId,
        images,
        street,
        neighborhood,
        city,
        voters: [authorId],
        location: {
          coordinates: [latitude, longitude],
        },
        description,
      });

      issue
        .save()
        .then((result) => {
          socket.emit('newissue', [result]);
          res.status(200).json({ message: 'Post adicionado com sucesso' });
        })
        .catch((error) => {
          res.status(500).json({
            error: `erro ao adicionar issue${error}`,
          });
        });
    }
  } else {
    res.status(400).json({
      message: 'Arquivo inválidos',
    });
  }
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
    Issue.findByIdAndUpdate({ _id: req.params.issueId }, { $set: updateOperations }, { new: true })
      .exec()
      .then((updatedIssue) => {
        if (updatedIssue.nModified !== 0) {
          res.status(200).json({
            message: 'Success',
            updatedIssue,
          });
        } else {
          res.status(400).json({
            message: 'Invalid ID',
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: `erro ao adicionar issue${error}`,
        });
      });
  } else {
    res.status(400).json({
      message: 'Nenhum campo para atualizar',
    });
  }
};

exports.deleteIssue = (socket) => async (req, res, next) => {
  Issue.findById(req.params.issueId)
    .exec()
    .then(async (result) => {
      for (image of result.images) {
        const img = await Image.findById(image);
        await img.remove();
      }

      Issue.deleteOne({ _id: req.params.issueId })
        .exec()
        .then(() => {
          res.status(200).json({ message: 'Post removido' });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error trying to delete item',
        error: error.message,
      });
    });
};

/* controladores de comentários */

exports.addComment = (socket) => (req, res, next) => {
  const { userId, userName, comment } = req.body;

  if (
    userId !== ''
    && userId !== undefined
    && userName !== ''
    && userName !== undefined
    && comment !== ''
    && comment !== undefined
  ) {
    Issue.updateOne(
      { _id: req.params.issueId },
      { $push: { comments: { userId, userName, comment } } },
    )
      .exec()
      .then((updatedIssue) => {
        if (updatedIssue.nModified !== 0) {
          socket.emit('newComment', { userName, userId, comment });
          res.status(200).json({
            message: 'Success',
          });
        } else {
          res.status(400).json({ message: 'Invalid ID' });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: `erro ao adicionar comentário${error}`,
        });
      });
  } else {
    res.status(400).json({
      message: 'Dados inválidos',
      result: {},
    });
  }
};

exports.deleteComment = (req, res, next) => {
  Issue.updateOne({ _id: req.params.issueId }, { $pull: { comments: { _id: req.body.commentId } } })
    .exec()
    .then((updatedComment) => {
      if (updatedComment.nModified !== 0) {
        res.status(200).json({
          message: 'Success',
          updatedComment,
        });
      } else {
        res.status(400).json({ message: 'Invalid ID' });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: `erro ao apagar comentário${error}`,
      });
    });
};

/* controladores de votos */

exports.addVote = (req, res, next) => {
  const { voter } = req.body;

  if (voter !== '' && voter !== undefined) {
    Issue.findById({ _id: req.params.issueId }, { voters: 1 })
      .exec()
      .then((result) => {
        Issue.updateOne({ _id: req.params.issueId }, { $push: { voters: voter } })
          .exec()
          .then((result) => {
            res.status(200).json({
              support: result,
              message: 'Adicionando um voto de suporte',
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: `Erro ao votar${error}`,
        });
      });
  } else {
    res.status(400).json({
      message: 'Dados inválidos',
      result: {},
    });
  }
};

exports.removeVote = (req, res, next) => {
  Issue.findById({ _id: req.params.issueId }, { voters: 1 })
    .exec()
    .then((result) => {
      if (result.voters.length > 0) {
        Issue.updateOne(
          { _id: req.params.issueId },
          { $pull: { voters: { $in: [req.body.voter] } } },
        )
          .exec()
          .then((result) => {
            res.status(200).json({
              support: result,
              message: 'Retirado um voto de suporte',
            });
          });
      } else {
        res.status(200).json({
          support: {},
          message: 'Nenhum voto para retirar',
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Erro ao votar${error}`,
      });
    });
};

exports.findByCategory = (req, res, next) => {
  Issue.find({ category: req.params.categoryId })
    .exec()
    .then((issues) => {
      res.status(200).json({
        message: 'Success',
        issues,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error',
        error,
      });
    });
};

exports.findByUser = (req, res, next) => {
  Issue.find({ authorId: req.params.userId })
    .exec()
    .then((issues) => {
      res.status(200).json({
        message: 'Success',
        issues: issues.sort((item1, item2) => new Date(item2.postedAt - new Date(item1.postedAt))),
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error',
        error,
      });
    });
};
