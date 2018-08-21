const proxyRequest = require('./proxyRequest');

const specificationProxy = (req, res, next) => {
    proxyRequest(req).then((response) => {
        res.writeHead(response.statusCode, response.headers);
        res.write(response.body);
        res.end();
    }, (error) => {
        console.log(error);
        res.error(error);
    })
};

module.exports = specificationProxy;