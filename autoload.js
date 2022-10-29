var fs = require('fs')
// reload()
var index = require('./index.js')
index.start()
monitorfile(function onevent(){
    index.stop()
    reload()
})

function monitorfile(event1){
    fs.watchFile('./index.js', function (event, filename) {
        // console.log('event is: ' + event);
        if (filename) {
            // console.log('filename provided: ' ,filename);
            // reload()
            event1()
        } else {
            console.log('filename not provided');
        }
    });
}
function reload(){
    console.log('reload',Object.keys(require.cache))
    for (var key in Object.keys(require.cache)) {
        var f = require.cache[key]
        console.log(key,f)
        if(f && !f.includes('autoload.js'))
            delete require.cache[key];
    }
    console.log(require.cache)
    var index = require('./index.js')
    index.start()
}
function reload(){
    delete require.cache[require.resolve('./index.js')];
    var i = require('./index.js')
    i.start()
}