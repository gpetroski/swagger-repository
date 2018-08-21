var express = require('express');
var router = express.Router();
var specification = require('../middleware/proxy/specification');
var service = require('../middleware/proxy/service');

router.get('/v1/specification', specification);
router.get('/v1/service', service);

module.exports = router;