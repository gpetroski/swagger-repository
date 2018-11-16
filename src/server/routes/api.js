var express = require('express');
var router = express.Router();
var documentation = require('../middleware/documentation/documentation');

router.post('/1.0/documentation', documentation.saveEnvironmentDocumentation);
router.post('/v2/documentation', documentation.saveEnvironmentDocumentation);
router.get('/v2/documentation', documentation.getAllDocumentation);

module.exports = router;