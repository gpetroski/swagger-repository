var express = require('express');
var router = express.Router();
const proxy = require('./proxy');
const api = require('./api');

const { renderApisList, renderApisDetails, renderWelcomeApis } = require('../middleware/ui/apis');
const { buildNavigation } = require('../middleware/navigation/navigation');

router.use(buildNavigation);

router.use('/proxy', proxy);
router.use('/api', api);

router.get('/', renderWelcomeApis);
router.get('/apis', renderApisList);
router.get('/apis/:serviceId', renderApisDetails);
router.get('/apis/:serviceId/:environment', renderApisDetails);

module.exports = router;
