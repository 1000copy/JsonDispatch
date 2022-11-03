let crypto = require('crypto');
let http = require('http');
// Very Simple Web Socket server
// module.exports = 
var ws = (opt) => {
    opt = opt || {};
    opt.port = opt.port || 8095;
    opt.host = opt.host || 'localhost';
    opt.onReady = opt.onReady || function (api) {
        api.sendText('Hello World')
    };
    // generate the accept key for the upgrade request
    let genAcceptKey = (req) => {
        let key = req.headers['sec-websocket-key'],
        sha1 = crypto.createHash('sha1');
        sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
        let acceptKey = sha1.digest('base64');
        return acceptKey;
    };
    // accept upgrade handler for upgrade event
    let acceptUpgrade = (req, socket) => {
        // gen accept key
        let acceptKey = genAcceptKey(req);
        // write response
        socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
            'Upgrade: WebSocket\r\n' +
            'Connection: Upgrade\r\n' +
            'Sec-WebSocket-Accept: ' + acceptKey + '\r\n' +
            '\r\n');
    };
    // simple send text frame helper
    let sendTextFrame = function (socket, text) {
        let firstByte = 0x00,
        secondByte = 0x00,
        payloadLength = Buffer.from([0, 0]),
        payload = Buffer.alloc(text.length);
        payload.write(text);
        firstByte |= 0x80; // fin bit true
        firstByte |= 0x01; // opt code of 1 (text)
        secondByte |= text.length; // mask and payload len
        let frame = Buffer.concat([Buffer.from([firstByte]), Buffer.from([secondByte]), payload]);
        socket.write(frame);
    };
    // create the server
    let wsServer = http.createServer();
    // upgrade handler
    wsServer.on('upgrade', (req, socket, head) => {
        // accept upgrade
        acceptUpgrade(req, socket);
        // send simple text frame
        //sendTextFrame(socket, 'Hello');
        opt.onReady({
            socket: socket,
            sendText: function (text) {
                sendTextFrame(this.socket, text);
            }
        }, socket);
    });
    wsServer.listen(opt.port, opt.host, () => {
        console.log('web socket server is up on port: ' + opt.port);
    });
    return wsServer;
};

// let http = require('http'),
fs = require('fs'),
path = require('path'),
// dirs
dir_root = path.resolve(__dirname),
dir_public = path.join(dir_root, '../www'),
// set ports (just hard coded for now)
port = 8090,
wsPort = 8095;
// The web server
let webServer = http.createServer();
// requests for client system
webServer.on('request', function (req, res) {
    // get the path
    let p = path.join(dir_public, req.url);
    // get stats of that path
    fs.lstat(p, function (e, stat) {
        // if error end
        if (e) {
            res.writeHead(500);
            res.write(JSON.stringify(e));
            res.end();
        }
        // if stats check it out
        if (stat) {
            // if it is not a file append index.html to path, and try that
            if (!stat.isFile()) {
                p = path.join(p, 'index.html');
            }
            // default encoding to utf-8, and get file extension
            let encoding = 'utf-8';
            let ext = path.extname(p).toLowerCase();
            // binary encoding if...
            encoding = ext === '.png' ? 'binary' : encoding;
            // try to read the path
            fs.readFile(p, encoding, function (e, file) {
                // if error end
                if (e) {
                    res.writeHead(500);
                    res.write(JSON.stringify(e));
                    res.end();
                }
                // if file, send it out
                if (file) {
                    // default mime to text/plain
                    let mime = 'text/plain';
                    // text
                    mime = ext === '.html' ? 'text/html' : mime;
                    mime = ext === '.css' ? 'text/css' : mime;
                    mime = ext === '.js' ? 'text/javascript' : mime;
                    // images
                    mime = ext === '.png' ? 'image/png' : mime;
                    res.writeHead(200, {
                        'Content-Type': mime
                    });
                    res.write(file, encoding);
                    res.end();
                }
            });
        }
    });
});
// start server
webServer.listen(port, function () {
    console.log('hosting client at: ');
    console.log('path: ' + dir_public);
    console.log('port: ' + port);
});
// using my simple web socket lib
// let sws = require('./ws.js');
let sws = ws
sws({
    port: wsPort,
    host: 'localhost',
    onReady: function (api) {
        setInterval(function () {
            api.sendText(Math.round(1024 + 1024 * Math.random()).toString(16))
        }, 100)
    }
});