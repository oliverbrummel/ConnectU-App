var router = require('express').Router();
var passport = require('passport');
var passportLinkedIn = require('../../auth/linkedIn');
var encryptLib = require('../../auth/encryption');
var adminModel = require('../../models/admin');
var LinkedInStrategy = require('passport-linkedin');

//Passport-LinkedIn routes
router.get('/linkedin', passportLinkedIn.authenticate('linkedin'));

router.get('/linkedin/callback',
  linkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});

//Password authentication for adminModel
router.get('/failure', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/failure.html'));
});

router.get('/', function(request, response){
  console.log('User', request.user);
  console.log('Is authenticated', request.isAuthenticated());
  response.sendFile(path.join(__dirname, '../public/views/main.html'));
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure'
}));

router.get('/register', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/register.html'));
});

router.get('/success', function(request, response) {
  console.log(request.user);
  console.log('User is logged in:' , request.isAuthenticated());
  response.sendFile(path.join(__dirname, '../public/views/success.html'));
});

router.get('/logout', function(request, response){
  request.logout();
  response.redirect('/');
});

router.post('/register', function(request, response){
  console.log(request.body);

  User.create(request.body, function(err){
    if(err){
      console.log('AHHH ERROR', err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

router.get('/user/:id', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/failure.html'));
});

router.get('/:name', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/failure.html'));
});

router.get('/*', function(request, response, next){
  if(request.isAuthenticated()){
    next();
  } else {
    response.send('404 not found');
  }
});

module.exports = router;
