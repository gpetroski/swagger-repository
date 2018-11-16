const documentationService = require('../../service/documentationService');
const _ = require('underscore');
const proxyPath = '/proxy/v1/specification?url=';

const renderSwaggerUi = (req, res, next) => {
    var serviceId = req.params.serviceId;
    var documentation = documentationService.getDocumentationByServiceId(serviceId);
    if (documentation.serviceName) {
        var environment = req.params.environment || Object.keys(documentation.environments)[0];
        var selectedEnvironment = documentation.environments[environment];
        var serviceEnvironments = _.map(_.keys(documentation.environments), (key) => {
            var name = key;
            var active = false;
            if (key === environment) {
                active = true;
            }
            return {
                name: name,
                active: active,
                serviceId: serviceId
            }
        });
        
        res.render('apis', {
            title: documentation.serviceName + ' | Swagger APIs',
            serviceId: serviceId,
            serviceName: documentation.serviceName,
            serviceSpecUrl: proxyPath + encodeURIComponent('http://' + selectedEnvironment.serviceHost + selectedEnvironment.swaggerSpecUrl),
            serviceEnvironments: serviceEnvironments
        });
    } else {
        res.error("Unable to find service documentation");
    }
};

module.exports = {
    renderSwaggerUi
};