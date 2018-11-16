const proxyRequest = require('./proxyRequest');

const specificationProxy = (req, res, next) => {
    proxyRequest(req).then((specResponse) => {
        res.writeHead(specResponse.statusCode, specResponse.headers);
        res.write(specResponse.body);
        res.end();
    }, (error) => {
        console.log(error);
        res.error(error);
    })
};

module.exports = specificationProxy;