const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const { authorValidationRules } = require('../middleware/validate');

router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);

// Removed () from authorValidationRules
router.post('/', authorValidationRules, authorsController.createAuthor);
router.put('/:id', authorValidationRules, authorsController.updateAuthor);

router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;