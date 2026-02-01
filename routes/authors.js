const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const { authorValidationRules } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate'); // Gatekeeper

// --- PUBLIC ROUTES ---
router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);

// --- PROTECTED ROUTES ---
// Order: 1. Is logged in? -> 2. Is data valid? -> 3. Execute
router.post('/', isAuthenticated, authorValidationRules, (req, res) => {
    /* #swagger.security = [{ "github_auth": [] }] */
    authorsController.createAuthor(req, res);
});

router.put('/:id', isAuthenticated, authorValidationRules, (req, res) => {
    /* #swagger.security = [{ "github_auth": [] }] */
    authorsController.updateAuthor(req, res);
});

router.delete('/:id', isAuthenticated, (req, res) => {
    /* #swagger.security = [{ "github_auth": [] }] */
    authorsController.deleteAuthor(req, res);
});

module.exports = router;