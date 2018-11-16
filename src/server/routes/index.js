var express = require('express');
var router = express.Router();
const proxy = require('./proxy');
const api = require('./api');
const { renderSwaggerUi } = require('../middleware/ui/apis');

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

router.get('/apis', function(req, res, next) {
  res.render('apis', {
    title: 'Swagger APIs',
    serviceName: 'Matching User Service',
    serviceSpecUrl: '/proxy/v1/specification?url=' + encodeURIComponent('http://r3-singles-user-service.np.vip.dc1.eharmony.com/user-service/swagger.json')
  });
});

router.get('/apis/:serviceId', renderSwaggerUi);
router.get('/apis/:serviceId/:environment', renderSwaggerUi);


module.exports = router;
