'use strict';

const express = require('express');
const cors = require('cors');
const request = require('request');
const urlJoin = require('url-join');

let args = process.argv.slice(2);
let host = args[0];

if (!host) {
    console.error('host required!');
    process.exit(1);
} else {
    console.info(`creating proxy for ${host}`);
}

let app = express();

app.use(cors());

app.use('/', function (req, res) {

    let uri = urlJoin(host, req.url);
    console.log(`Forwarding request: ${req.method} - ${uri}`);
    req
        .pipe(request({
            'uri': uri,
            'rejectUnauthorized': false
        }))
        .pipe(res);
});

let port = process.env.PORT || 3000
let server = app.listen(port, () => console.info(`server listening at port ${port}`));
server.on('error', error => console.error(error.stack));
