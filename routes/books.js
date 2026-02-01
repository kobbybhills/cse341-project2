const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { bookValidationRules } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate'); // Add this!

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

// --- PROTECTED ROUTES ---:
router.post('/', isAuthenticated, bookValidationRules, booksController.createBook);
router.put('/:id', isAuthenticated, bookValidationRules, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;