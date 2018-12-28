var express = require('express');
var router = express.Router();
var documentation = require('../middleware/documentation/documentation');

router.post('/1.0/documentation', documentation.saveLegacyEnvironmentDocumentation);
router.post('/v2/documentation', documentation.saveEnvironmentDocumentation);
router.get('/v2/documentation', documentation.getAllDocumentation);
router.get('/v2/documentation/:serviceId', documentation.getDocumentationByServiceId);
router.get('/v2/documentation/:serviceId/:environment', documentation.getDocumentationByServiceIdAndEnvironment);
router.delete('/v2/documentation/:serviceId', documentation.deleteDocumentationByServiceId);
router.delete('/v2/documentation/:serviceId/:environment', documentation.deleteDocumentationByServiceIdAndEnvironment);

module.exports = router;