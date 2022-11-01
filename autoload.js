var autoload = require('./lib/autoload.js')
var path = require('path')
autoload.run( {
    entryfile:path.resolve('./index.js'),
    clearscreen:true,
    monitorroot:path.resolve('./'),
})