const http = require('http');
const https = require('https');
const url = require('url');

const proxyRequest = (req) => {
    return new Promise((resolve, reject) => {
        var client = http;

        var requestUrl = decodeURIComponent(req.query.url);

        if (!requestUrl) {
            reject("No url provided");
        }

        if (req.headers['host']) {
            delete req.headers['host'];
        }

        var parsedUrl = url.parse(requestUrl);

        const options = {
            protocol: parsedUrl.protocol,
            hostname: parsedUrl.hostname,
            port: parsedUrl.protocol === 'http:' ? 80 : 443,
            path: parsedUrl.path,
            query: parsedUrl.query,
            headers: req.headers,
            method: req.method,
            hash: parsedUrl.hash ? parsedUrl.hash : ""
        };

        if (parsedUrl.protocol === 'https:') {
            client = https;
        }

        const proxyReq = client.request(options, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve({
                    statusCode: resp.statusCode,
                    headers: resp.headers,
                    body: data
                });
            });

        }).on("error", (err) => {
            console.log("error", err);
            reject(err);
        });

        if (req.body && Object.keys(req.body).length > 0) {
            proxyReq.write(req.body);
        }
        proxyReq.end();
    });
};

module.exports = proxyRequest;