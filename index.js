const { check } = require('./lib/check')
check(1,1,'3')
require('./lib/ws')
return;
const { start,stop } = require('./lib/httpserver.js')
// check(start!=undefined,true)
console.log('starting')
start(()=>{
    console.log('started')
},{wwwdir:'./www'});
module.exports.start = start;
module.exports.stop = stop;