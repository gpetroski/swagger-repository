var alerter = require('./testfunction');

//alerter("some thing");

const SwaggerUI = require('swagger-ui');
import 'swagger-ui/dist/swagger-ui.css';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../images/swagger-green.png';
import '../images/swagger.png';

SwaggerUI({
    url: "https://petstore.swagger.io/v2/swagger.json",
    dom_id: '#swagger-ui'
});