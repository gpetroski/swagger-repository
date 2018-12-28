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
            let data = [];

            resp.on('data', function(chunk) {
                data.push(chunk);
            });
            resp.on('end', function() {
                var binaryData = Buffer.concat(data);
                resolve({
                    statusCode: resp.statusCode,
                    headers: resp.headers,
                    body: binaryData
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

function gunzipResponse(response, resolve){
    var gunzip = zlib.createGunzip();
    var unzippedData = '';
    var headers = Object.assign({}, response.headers);
    delete headers['content-encoding'];

    gunzip.on('data', function(data){
        unzippedData += data.toString();
    });

    gunzip.on('end', function(){
        resolve({
            statusCode: response.statusCode,
            headers: headers,
            body: unzippedData
        });
    });

    response.pipe(gunzip);
}

module.exports = proxyRequest;