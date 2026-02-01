const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const passport = require('passport');

// --- SWAGGER ---
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- AUTH ROUTES ---
// Starts the GitHub login process
router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Ends the session
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(function(err) {
      res.clearCookie('connect.sid'); 
      res.redirect('/api-docs'); // Redirects to home route
    });
  });
});

// The GitHub Callback URL
router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/api-docs', 
    session: true 
  }),
  (req, res) => {
    // Passport automatically attaches the user to req.user
    res.redirect('/api-docs'); // Redirect to home or desired route after successful login
  });

// --- API ROUTES ---
router.use('/books', require('./books'));
router.use('/authors', require('./authors'));

// Home route redirects to API docs
router.get('/', (req, res) => {
  res.redirect('/api-docs');
});
module.exports = router;