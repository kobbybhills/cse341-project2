const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { bookValidationRules } = require('../middleware/validate'); // Removed "validate"

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

// Removed () from bookValidationRules
router.post('/', bookValidationRules, booksController.createBook);
router.put('/:id', bookValidationRules, booksController.updateBook);

router.delete('/:id', booksController.deleteBook);

module.exports = router;