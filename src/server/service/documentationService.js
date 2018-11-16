// load documentation at startup

// write documentation

// read documentation

// find service by id

// 

const DEFAULT_LOCATION = process.cwd() + '/documentation.json';

class DocumentationService {
    constructor() {
        var documenationLocation = process.env['DOCUMENTATION_LOCATION'] || DEFAULT_LOCATION;
        this.documentation = require(documenationLocation);
    }

    saveEnvironmentDocumentation(documentation) {
        var serviceId = documentation.id.split(":")[0];
        var tempDocumentation = Object.assign({}, this.documentation);
        if (!tempDocumentation[serviceId]) {
            tempDocumentation[serviceId] = {
                id: serviceId,
                serviceName: documentation.serviceName,
                serviceDescription: documentation.serviceDescription,
                category: documentation.category,
                environments: {}
            }
        }

        var existingDocumentation = tempDocumentation[serviceId];
        existingDocumentation.environments[documentation.environment] = {
            serviceHost: documentation.serviceHost,
            swaggerUiUrl: documentation.swaggerUiUrl,
            swaggerSpecUrl: documentation.swaggerSpecUrl,
        }
        this.documentation = tempDocumentation;
    }

    getAllDocumentation() {
        return this.documentation;
    }

    getDocumentationByServiceId(serviceId) {
        if (this.documentation[serviceId]) {
            return this.documentation[serviceId];
        } else {
            return {};
        }
    }
}

module.exports = new DocumentationService();