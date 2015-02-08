var http = require('http');
var httpProxy = require('http-proxy');

// TODO: FIX IE BUG

// create the proxy server to handle requests with
var proxy = httpProxy.createProxyServer({});

// catch errors, primarily used for socket disconnects
proxy.on('error', function(error) {
    // TODO maybe more robust error message logging?
    console.log(error);
});


// main server to handle redirecting via the proxy server
var server = http.createServer(function(req,res) {

    // some basic logging
    console.log(req.headers.host +' -> '+ req.url);

    localhost = 'http://127.0.0.1:'
    port = 3000;

    if (req.headers.host == 'so-b-it.me') {
        port = 3000;
    }
    else if (req.headers.host == 'tritonchat.me') {
        port = 8000;
    }

    proxy.web(req, res, {target: localhost+port});
});


// set the main facing port to 80 (default http)
console.log('listening on port 80');
server.listen(80);

