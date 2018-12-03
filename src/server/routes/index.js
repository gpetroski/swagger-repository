var express = require('express');
var router = express.Router();
const proxy = require('./proxy');
const api = require('./api');
const { renderApisList, renderApisDetails } = require('../middleware/ui/apis');
const { buildNavigation } = require('../middleware/navigation/navigation');

router.use(buildNavigation);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Swagger Repository',
    contentClass: 'content-nav',
    breadcrumbs: false
  });
});

router.use('/proxy', proxy);
router.use('/api', api);

router.get('/dashboards', function(req, res, next) {
  res.render('dashboards', {
    title: 'Dashboards',
    contentClass: 'content-subnav',
    breadcrumbs: true
  });
});

router.get('/apis', renderApisList);
router.get('/apis/:serviceId', renderApisDetails);
router.get('/apis/:serviceId/:environment', renderApisDetails);

module.exports = router;
