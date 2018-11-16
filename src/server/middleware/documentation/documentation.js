const documentationService = require('../../service/documentationService');

const saveEnvironmentDocumentation = (req, res, next) => {
    documentationService.saveEnvironmentDocumentation({});
    res.status(201).json({});
};

const getAllDocumentation = (req, res, next) => {
    res.status(200).json(documentationService.getAllDocumentation());
}

module.exports = {
    saveEnvironmentDocumentation, 
    getAllDocumentation
};