const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategory);
router.post('/', categoryController.postCategory);
router.patch('/:categoryId', categoryController.updateCategory);
router.delete('/:categoryId', categoryController.deleteCategory);

module.exports = router;
