const documentationService = require('../../service/documentationService');

const saveLegacyEnvironmentDocumentation = (req, res) => {
    documentationService.saveLegacyEnvironmentDocumentation(req.body);
    res.status(200).json(req.body);
};

const saveEnvironmentDocumentation = (req, res) => {
    documentationService.saveEnvironmentDocumentation(req.body);
    res.status(200).json(req.body);
};

const getDocumentationByServiceId = (req, res) => {
    var serviceId = req.params.serviceId;
    var serviceDocumentation = documentationService.getDocumentationByServiceId(serviceId);
    if (serviceDocumentation) {
        res.status(200).json(serviceDocumentation);
    } else {
        res.status(404).json({ message: "No service found " + serviceId});
    }
}

const getDocumentationByServiceIdAndEnvironment = (req, res) => {
    var serviceId = req.params.serviceId;
    var environment = req.params.environment;
    var serviceDocumentation = documentationService.getDocumentationByServiceId(serviceId);
    if (serviceDocumentation && serviceDocumentation.environments[environment]) {
        res.status(200).json(serviceDocumentation.environments[environment]);
    } else {
        res.status(404).json({ message: "No environment " + environment + " found for service " + serviceId});
    }
}

const deleteDocumentationByServiceId = (req, res) => {
    var serviceId = req.params.serviceId;
    if (documentationService.deleteDocumentationByServiceId(serviceId)) {
        res.status(200).json({ message: "Service removed " + serviceId});
    } else {
        res.status(404).json({ message: "No service found " + serviceId});
    }
}

const deleteDocumentationByServiceIdAndEnvironment = (req, res) => {
    var serviceId = req.params.serviceId;
    var environment = req.params.environment;
    if (documentationService.deleteDocumentationByServiceIdAndEnvironment(serviceId, environment)) {
        res.status(200).json({ message: "Environment " + environment + " removed for service " + serviceId});
    } else {
        res.status(404).json({ message: "No environment " + environment + " found for service " + serviceId});
    }
}

const getAllDocumentation = (req, res) => {
    res.status(200).json(documentationService.getAllDocumentation());
}

module.exports = {
    saveEnvironmentDocumentation, 
    saveLegacyEnvironmentDocumentation,
    getAllDocumentation,
    getDocumentationByServiceId,
    getDocumentationByServiceIdAndEnvironment,
    deleteDocumentationByServiceId,
    deleteDocumentationByServiceIdAndEnvironment
};