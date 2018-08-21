var express = require('express');
var router = express.Router();
const proxy = require('./proxy');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Swagger Repository',
    contentClass: 'content-nav',
    breadcrumbs: false
  });
});

router.use('/proxy', proxy);

router.get('/dashboards', function(req, res, next) {
  res.render('dashboards', {
    title: 'Dashboards',
    contentClass: 'content-subnav',
    breadcrumbs: true
  });
});

router.get('/apis', function(req, res, next) {
  res.render('apis', {
    title: 'Swagger APIs',
    contentClass: 'content-subnav',
    breadcrumbs: true
  });
});

router.get('/apis/:name', function(req, res, next) {
  res.render('api', {
    title: 'Swagger API',
    contentClass: 'content-subnav',
    breadcrumbs: true
  });
});


module.exports = router;
