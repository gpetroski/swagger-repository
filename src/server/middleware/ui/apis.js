const documentationService = require('../../service/documentationService');
const _ = require('underscore');
const proxyPath = '/proxy/v1/specification?url=';
const SWAGGER_COOKIE_NAME = "recentSwaggerServices";
const RECENT_SERVICES_MAX = 10;

const renderApisDetails = (req, res, next) => {
    var serviceId = req.params.serviceId;
    var documentation = documentationService.getDocumentationByServiceId(serviceId);
    updateRecentCookie(req, res, serviceId);
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
        res.render('apis-error');
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

const renderWelcomeApis = (req, res, next) => {
    var allDocumentation = documentationService.getAllDocumentation();
    var recentServices = [];

    if (req.cookies[SWAGGER_COOKIE_NAME]) {
        recentServices = req.cookies[SWAGGER_COOKIE_NAME].split(",");
    }

    var servicesDocumentation = [];
    _.forEach(recentServices, function(serviceId) {
        if (allDocumentation[serviceId]) {
            servicesDocumentation.push(allDocumentation[serviceId]);
        }
    });
    res.render('index', {
        title: 'Swagger Repository',
        servicesDocumentation: servicesDocumentation
    });
}

const updateRecentCookie = (req, res, serviceId) => {
    var recentServices = [];

    if (req.cookies[SWAGGER_COOKIE_NAME]) {
        recentServices = req.cookies[SWAGGER_COOKIE_NAME].split(",");
    }

    if (recentServices.includes(serviceId)) {
        var filteredRecentSerivces = _.filter(recentServices, (service) => {
            return serviceId != service;
        });
        recentServices = filteredRecentSerivces;
    }

    recentServices.unshift(serviceId);
    if (recentServices.length > RECENT_SERVICES_MAX) {
        recentServices.pop();
    }
    res.cookie(SWAGGER_COOKIE_NAME, recentServices.join(","), { maxAge: 1000 * 60 * 60 * 24 * 30 });
}

module.exports = {
    renderApisDetails,
    renderApisList,
    renderWelcomeApis
};