const router = require('express').Router();
const multer = require('multer');
const authMiddleware = require('../middlewares/auth');

const multerConfig = require('../config/multer');

const issuesController = require('../controllers/issuesController');

module.exports = function (socket) {
  router.get('/', issuesController.getIssues);
  router.get('/:issueId', issuesController.getIssue);

  router.post('/', multer(multerConfig).array('files', 3), issuesController.postIssue(socket));
  router.patch('/:issueId', issuesController.updateIssue);
  router.delete('/:issueId', issuesController.deleteIssue(socket));

  router.post('/comments/:issueId', issuesController.addComment(socket));
  router.delete('/comments/:issueId/', issuesController.deleteComment);

  router.post('/support/add/:issueId', issuesController.addVote);
  router.post('/support/remove/:issueId/', issuesController.removeVote);

  router.get('/category/:categoryId', issuesController.findByCategory);
  router.get('/user/:userId', issuesController.findByUser);

  return router;
};
