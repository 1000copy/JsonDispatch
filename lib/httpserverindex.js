var jd = require('.')
module.exports = jd
// module.exports.register = register;
// module.exports.dispatch = dispatch;
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var server;
var onrequest = (req, res) => {
    var rr = 44
    console.log(rr)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(""+rr);
  }
  const sockets = new Set();
function destroySockets(sockets) {
    for (const socket of sockets.values()) {
        socket.destroy();
    }
}
function start(){
    console.log('start')
    server = http.createServer();

    server.on('request',onrequest)
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
      });
    server.on('connection', (socket) => {
     sockets.add(socket);

     server.once('close', () => {
        socket.destroy()
        sockets.delete(socket);
    });
    });
}

function stop(){
    destroySockets(sockets);
    server.removeListener('request',onrequest)
    console.log('stop')
    server.close();
}
function start(){}
function stop(){}
module.exports.start = start
module.exports.stop = stop