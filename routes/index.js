var express = require('express');
var router = express.Router();
var vehicles = require("../controllers/vehicles");
var requests = require("../controllers/requests");

function setUser(req, res){
  return typeof req.session.passport ? req.session.user : null;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: setUser(req, res)});
});

/* org signup page. */
router.get('/org/signup', function (req, res, next) {
  res.render('org-signup', { title: 'Express', user: setUser(req, res)});
});

/* Individual signup page. */
router.get('/ind/signup', function (req, res, next) {
  res.render('ind-signup', { title: 'Express', user: setUser(req, res) });
});

/* Individual signin page. */
router.get('/ind/signin', function (req, res, next) {
  res.render('ind-signin', { title: 'Express', user: setUser(req, res) });
});

/* Company signin page. */
router.get('/org/signin', function (req, res, next) {
  res.render('org-signin', { title: 'Express', user: setUser(req, res) });
});

/* Vehicle registration page. */
router.get('/vehicle-registration', function (req, res, next) {
  res.render('vehicle-registration', { title: 'Express', user: setUser(req, res) });
});

/* Vehicle registration page. */
router.post('/register-vehicle', ensureAuthenticated, vehicles.registerVehicle);

/* My Vehicles page. */
router.get('/my-vehicles', ensureAuthenticated, vehicles.getUserVehicles);

/* Delete Vehicle */
router.post('/my-vehicles/delete', ensureAuthenticated, vehicles.deleteVehicle);

/* Create request */
router.post('/request/create', ensureAuthenticated, requests.createRequest);

/* Check if org exists */
router.post('/request/find-org', ensureAuthenticated, requests.organizationExists);

/* All requests */
router.get('/park-requests', ensureAuthenticated, requests.all);

/* delete request */
router.post('/requests/delete', ensureAuthenticated, requests.delete);

/* accept incoming */
router.post('/requests/acceptIncoming', ensureAuthenticated, requests.acceptIncoming);

/* accept outgoing */
router.post('/requests/acceptOutgoing', ensureAuthenticated, requests.acceptOutgoing);

/* Parked vehicles */
router.get('/parked-vehicles', ensureAuthenticated, vehicles.getParkedVehicles);

function ensureAuthenticated(req, res, next) {
  if (req.session.user !== undefined) { return next(); }
  res.redirect('/')
}

module.exports = router;