const SwaggerUI = require('swagger-ui');
import 'swagger-ui/dist/swagger-ui.css';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../images/swagger-green.png';
import '../images/swagger.png';
const { ProxyRequestWrapperPlugin, ProxyRemovalSelectorsPlugin } = require('./swaggerWrappers');

export const loadSwaggerUi = (url, parent) => {
    SwaggerUI({
        presets: [
            SwaggerUI.presets.apis,
            ProxyRequestWrapperPlugin,
            ProxyRemovalSelectorsPlugin
        ],
        url: url,
        dom_id: parent
    });
}

if (serviceSpecUrl && swaggerContainer) {
    loadSwaggerUi(serviceSpecUrl, swaggerContainer);
}