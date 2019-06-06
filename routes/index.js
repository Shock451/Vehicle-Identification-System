var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* org signup page. */
router.get('/org/signup', function (req, res, next) {
  res.render('org-signup', { title: 'Express' });
});

/* Individual signup page. */
router.get('/individual/signup', function (req, res, next) {
  res.render('ind-signup', { title: 'Express' });
});

/* Individual signin page. */
router.get('/individual/signin', function (req, res, next) {
  res.render('ind-signin', { title: 'Express' });
});

/* Company signin page. */
router.get('/org/signin', function (req, res, next) {
  res.render('org-signin', { title: 'Express' });
});

module.exports = router;