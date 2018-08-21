var alerter = require('./testfunction');

//alerter("some thing");

const SwaggerUI = require('swagger-ui');
import 'swagger-ui/dist/swagger-ui.css';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../images/swagger-green.png';

SwaggerUI({
    url: "http://localhost:3000/proxy/v1/specification?url=https://petstore.swagger.io/v2/swagger.yaml",
    dom_id: '#swagger-ui'
});