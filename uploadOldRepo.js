var http = require('http');
var oldDocumentation = require('./oldDocumentation.json');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/1.0/documentation',
    method: 'POST'
};

const saveDocumentation = (documentation) => {
    console.log(documentation);
    const proxyReq = http.request(options, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(resp.statusCode);
            console.log(resp.body);
        });

    }).on("error", (err) => {
        console.log("error", err);
    });

    proxyReq.write(JSON.stringify(documentation));
    proxyReq.end();
}

for (var i = 0; i < oldDocumentation.length; i++) {
    saveDocumentation(oldDocumentation[i]);
}

