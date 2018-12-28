const DEFAULT_LOCATION = process.cwd() + '/documentation.json';
const fs = require('fs');
const _ = require('underscore');

class DocumentationService {
    constructor() {
        this.documentationLocation = process.env['DOCUMENTATION_LOCATION'] || DEFAULT_LOCATION;
        this.documentation = require(this.documentationLocation);
    }

    saveEnvironmentDocumentation(documentation) {
        var serviceId = documentation.id;
        var tempDocumentation = Object.assign({}, this.documentation);
        if (!tempDocumentation[serviceId]) {
            tempDocumentation[serviceId] = {
                id: serviceId,
                serviceName: documentation.serviceName,
                serviceDescription: documentation.serviceDescription,
                category: documentation.category
            }
        }

        var existingDocumentation = tempDocumentation[serviceId];

        _.forEach(documentation.environments, (environmentInfo, environment) => {
            existingDocumentation.environments[environment] = environmentInfo;
        });
        this.documentation = tempDocumentation;
        this.writeDocumentationToFile();
    }

    saveLegacyEnvironmentDocumentation(documentation) {
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
            environment: documentation.environment
        }
        this.documentation = tempDocumentation;
        this.writeDocumentationToFile();
    }

    writeDocumentationToFile() {
        var documentationLocation = this.documentationLocation;
        var documentation = JSON.stringify(this.documentation);
        fs.writeFile(documentationLocation, documentation, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("Documentation saved to " + documentationLocation);
        }); 
    }

    deleteDocumentationByServiceId(serviceId) {
        var serviceId = req.params.serviceId;
        if (this.documentation[serviceId]) {
            delete allDocumentation[serviceId];
            this.writeDocumentationToFile();
            return true;
        } else {
            return false;
        }
    }
    
    deleteDocumentationByServiceIdAndEnvironment(serviceId, environment) {
        var serviceDocumentation = this.getDocumentationByServiceId(serviceId);
        if (serviceDocumentation && serviceDocumentation.environments[environment]) {
            delete serviceDocumentation.environments[environment];
            this.writeDocumentationToFile();
            return true;
        } else {
            return false;
        }
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