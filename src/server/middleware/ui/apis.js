const documentationService = require('../../service/documentationService');
const _ = require('underscore');
const proxyPath = '/proxy/v1/specification?url=';

const renderApisDetails = (req, res, next) => {
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
        
        res.render('apis-details', {
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

const renderApisList = (req, res, next) => {
    var categoryFilter = req.query.category;
    var nameFilter = req.query.name;
    var allDocumentation = documentationService.getAllDocumentation();
    var servicesDocumentation = [];
    _.forEach(allDocumentation, function(serviceDocumentation, serviceId) {
        var add = true;
        if (categoryFilter) {
            if (serviceDocumentation.category.toLowerCase().trim() !== categoryFilter.toLowerCase().trim()) {
                add = false;
            }
        }
        if (nameFilter) {
            if (serviceDocumentation.serviceName.toLowerCase().trim().indexOf(nameFilter.toLowerCase().trim()) < 0) {
                add = false;
            } 
        }
        if (add) {
            servicesDocumentation.push(serviceDocumentation);
        }
    });

    servicesDocumentation.sort(function(a, b){
        if(a.serviceName < b.serviceName) { return -1; }
        if(a.serviceName > b.serviceName) { return 1; }
        return 0;
    });
    res.render('apis-list', {
        title: 'Swagger APIs',
        servicesDocumentation: servicesDocumentation,
        categoryFilter: categoryFilter,
        nameFilter: nameFilter,
        reset: nameFilter || categoryFilter
    });
}

module.exports = {
    renderApisDetails,
    renderApisList
};