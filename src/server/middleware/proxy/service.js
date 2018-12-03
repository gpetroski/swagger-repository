const proxyRequest = require('./proxyRequest');

const serviceProxy = (req, res, next) => {
    proxyRequest(req).then((response) => {
        res.writeHead(response.statusCode, response.headers);
        res.write(response.body);
        res.end();
    }, (error) => {
        console.log(error);
        res.render('apis-error');
    })
};

module.exports = serviceProxy;