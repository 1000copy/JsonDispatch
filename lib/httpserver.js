// const { fileURLToPath } from 'url'
// import { dirname } from 'path'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)
// import http from 'http';
// import url from 'url';
// import fs from 'fs';
// import path from 'path';
// import {default as XYZ }  from './index.js';
// const hostname = '127.0.0.1';
// // const hostname = '192.168.1.4';
// const port = process.argv[2] || 3000;

// function static1(req, res,base) {
//     // console.log(`${req.method} ${req.url}`);
//     const parsedUrl = url.parse(req.url);    
    
//     var pathname = `${parsedUrl.pathname}`;
//     var originpath = `${parsedUrl.pathname}`;
//     // console.log(`${pathname}`)
//     if (pathname == '/')
//         pathname = '/index.html';
//         // console.log(`${pathname}`)
//     var pathname = `${base}${pathname}`;
//     const ext = path.parse(pathname).ext;
//     const map = {
//       '.ico': 'image/x-icon',
//       '.html': 'text/html',
//       '.js': 'text/javascript',
//       '.json': 'application/json',
//       '.css': 'text/css',
//       '.png': 'image/png',
//       '.jpg': 'image/jpeg',
//       '.wav': 'audio/wav',
//       '.mp3': 'audio/mpeg',
//       '.svg': 'image/svg+xml',
//       '.pdf': 'application/pdf',
//       '.doc': 'application/msword'
//     };      
//     // if is a directory search for index file matching the extension
//     // if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;
//     // read file from file system
//     fs.readFile(pathname, function(err, data){
//         if(err){
//             if(err.code == 'ENOENT'){
//                 fs.readFile(base+'/404.html', function(err, content) {
//                     if (err){
//                         res.statusCode = 404;
//                         res.end(`File ${originpath} not found!`);
//                         return
//                     }
//                     res.writeHead(200, { 'Content-Type': 'text/html' });
//                     res.end(content, 'utf-8');
//                 });
//             }
//             else {
//                 res.writeHead(500);
//                 res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
//                 res.end(); 
//             }
//         } else {
//             // if the file is found, set Content-type and send data
//             res.setHeader('Content-type', map[ext] || 'text/plain' );
//             res.end(data);
//         }
//     });
    
// }
async function  echo1(req,res,json){
    var jsonObj = JSON.parse(json);
    
    // const XYZ = require('../lib/index.js')
    try{
        // console.log(jsonObj)
        var result = await  XYZ.dispatch(jsonObj)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.end(JSON.stringify({data:result})); 
    }catch(e){
        console.log(e)
        res.setHeader('Content-Type', 'text/json');
        res.end(JSON.stringify({err:e.message})); 
    }
}
function parseJson(req, res){
            var json = '';
            req.on('data', function (chunk){
                json += chunk.toString('utf8');
            });
            req.on('end', function (){                
                echo1(req,res,json)
            });
}
var onrequest =(req, res) => {    
    // console.log(req.method,req.url)
    if(req.method == 'POST' && req.url == '/api'){
        parseJson(req,res)
    }else    
        static1(req,res,wwwdir)
}
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { extname } = require('path');


let mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt',
  '.json': 'application/json'
};


var  static1 = function (request, res) {
    let pathName = url.parse(request.url).path;
    if(pathName === '/'){
        pathName = '/index.html';
    }
    pathName = pathName.substring(1, pathName.length);
    let extName = path.extname(pathName);
    let staticFiles = `${wwwdir}/${pathName}`;
    if(extName =='.jpg' || extName == '.png' || extName == '.ico' || extName == '.eot' || extName == '.ttf' || extName == '.svg')
    {
        try{
        let file = fs.readFileSync(staticFiles);
        res.writeHead(200, {'Content-Type': mimeTypes[extname]});
        res.write(file, 'binary');
        res.end();
        }catch(e){
            res.writeHead(404, {'Content-Type': 'text/html;charset=utf8'});
            res.write(`<strong>${staticFiles}</strong>File is not found.`);
        }
    }else {
        fs.readFile(staticFiles, 'utf8', function (err, data) {
            if(!err){
                if(!mimeTypes[extName])
                    throw new Error('no mime type for '+extName)
                res.writeHead(200, {'Content-Type': mimeTypes[extName]});
                res.end(data);
            }else {
                res.writeHead(404, {'Content-Type': 'text/html;charset=utf8'});
                res.write(`<strong>${staticFiles}</strong>File is not found.`);
            }
            res.end();
        });
    }
}
var wwwdir = './www'
var port = '3000'
var hostname = '127.0.0.1'
var server
function start(init,options){
    if(!options)options={}
    if(options.wwwdir)
        wwwdir = options.wwwdir
    server = http.createServer(onrequest);
    server.on('connection', (socket) => {
        sockets.add(socket);    
        server.once('close', () => {
           socket.destroy()
           sockets.delete(socket);
       });
    });
    server.listen(port, hostname, () => {
        if(init)init()
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

function stop(){
    console.log('stop!')
    destroySockets(sockets);
    server.removeListener('request',onrequest)
    console.log('stop')
    server.close();
}
const sockets = new Set();
function destroySockets(sockets) {
    for (const socket of sockets.values()) {
        socket.destroy();
    }
}
module.exports.start = start;
module.exports.stop = stop;