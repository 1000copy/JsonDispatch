var fs = require('fs')

function monitorfile(event1,ftt){
    var fs = require('fs')
    function watchr(dirname,event){
        let fsWait = false;
        fs.watch(dirname,{recursive:true},(eventType,filename)=>{
            if (filename) {
            try{
            if(fs.lstatSync(dirname+filename).isDirectory())return;
            }catch{}        
            if (fsWait) return;
            fsWait = setTimeout(() => {
                fsWait = false;
            }, 100);  
            event(filename)
            }
        })
    }
    let dirnames = fs.readdirSync(monitorroot)
    console.log(dirnames)
    dirnames = dirnames.filter(ftt)
    for(const dirname of dirnames){ 
        watchr(dirname,event1)
    }
}
var index = undefined;
function isfilter(key){
    var arr = ['autoload.js','ws.js','httpserver.js','index.js']
    var r = true
    for(const f of arr){
        r = r && !key.endsWith(f)
    }
    return r
}
function reload(){
    try{
        // console.log(require.cache)
        for(var key in require.cache){            
            if(isfilter(key))
                delete require.cache[key];
        }
        // console.log(require.cache)
        // if(clearscreen)
        //     process.stdout.write('\033c');
        index = require(entry)
        index.reload && index.reload()
    }catch(e){
        console.log(e.message)        
        // console.trace("Here I am!?")
    }    
}
var entry = '../index.js'
var trace_= false
var clearscreen = true
var monitorroot = '../'
module.exports.run = function run(options){       
    if(options.entryfile)
        entry = options.entryfile
    // index = require(entry) 
    clearscreen =  options.clearscreen                            
    monitorroot = options.monitorroot
    monitorfile(
        reload,
        (value)=>{return !(value.startsWith('.') || value.includes('NODE_MODULE') )} 
        //||!value.endsWith('.js') || !value.endsWith('.json')
    )    
    // reload()
    index = require(entry)
    index.start && index.start()
}
