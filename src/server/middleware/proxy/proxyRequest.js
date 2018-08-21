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

        var parsedUrl = url.parse(requestUrl);
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.path,
            method: req.method,
            headers: req.headers,
            hash: parsedUrl.hash
        };

        console.log(options.headers);

        if (parsedUrl.protocol.indexOf('https') >= 0) {
            client = https;
        }

        client.request(options, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(resp.statusCode);
                console.log(resp.headers);
                console.log(data);
                resolve({
                    statusCode: resp.statusCode,
                    headers: resp.headers,
                    body: data
                });
            });

        }).on("error", (err) => {
            reject(err);
        });

    });
};

module.exports = proxyRequest;