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
function reload(){
    try{
        index && index.reload && index.reload()
        setTimeout(function() { 
            try{
                index && index.stop && index.stop()
                for(var key in require.cache){
                    if(!key.endsWith('autoload.js'))
                        delete require.cache[key];
                }
                if(clearscreen)
                    process.stdout.write('\033c');
                index = require(entry)
                index.start && index.start()        
            }catch(e){
                console.log(e.message)        
                console.trace("Here I am!")
            }
        }, 3000);
        
    }catch(e){
        console.log(e.message)        
        console.trace("Here I am!")
    }
}
var entry = '../index.js'
var trace_= false
var clearscreen = true
var monitorroot = '../'
module.exports.run = function run(options){    
    entry = options.entryfile
    clearscreen =  options.clearscreen                            
    monitorroot = options.monitorroot
    monitorfile(
        reload,
        (value)=>{return !(value.startsWith('.') || value.includes('NODE_MODULE') )} 
        //||!value.endsWith('.js') || !value.endsWith('.json')
    )    
    reload()
}
