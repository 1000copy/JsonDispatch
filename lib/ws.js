let crypto = require('crypto');
let http = require('http');
// Very Simple Web Socket server
var  wsServer 
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
        try{
            if(socket.writable)
                socket.write(frame)
            else
                console.log('no writable')
        }
        catch(e){
            console.log(e.message)
        }
        
    };
    // create the server
    wsServer = http.createServer();
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
    wsServer.on('connection', (socket) => {
        sockets.add(socket);    
        wsServer.once('close', () => {
           socket.destroy()
           sockets.delete(socket);
       });
    });
    wsServer.listen(opt.port, opt.host, () => {
        console.log('web socket server is up on port: ' + opt.port);
    });
    return wsServer;
};
function stop(){
    console.log('stop ws!')
    destroySockets(sockets);
    // server.removeListener('request',onrequest)
    console.log('stop ws')
    wsServer.close();
}
const sockets = new Set();
function destroySockets(sockets) {
    for (const socket of sockets.values()) {
        socket.destroy();
    }
}
module.exports.start = ws
module.exports.stop = stop