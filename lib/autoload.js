var fs = require('fs')

function monitorfile(event1){
    // var fs = require('fs')
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
            // console.log(`changed:${dirname}/${filename}`)
            console.log(`changed:${filename}`)
            event(filename)
            }
        })
    }
    let dirnames = fs.readdirSync(monitorroot)    
    // dirnames = dirnames.filter(ftt)
    dirnames = dofilter(dirnames,fexclude)
    console.log(dirnames)
    for(const dirname of dirnames){ 
        watchr(dirname,event1)
    }
}
var index = undefined;
function isfilter(key){
    var arr = ['autoload.js']
    // var arr = ['autoload.js','ws.js','httpserver.js','index.js']
    // var r = true
    // for(const f of arr){
    //     r = r && !key.endsWith(f)
    // }
    // var arr = ['.git']
    // var r = true
    // for(const f of arr){
    //     r = r && !key.startsWith(f)
    // }
    var r = true
    for(const f of arr){
        r = r&&!key.endsWith(f)
    }
    // console.log(r,key)
    return r
}
function reload(){
    try{
        // console.log(require.cache)
        for(var key in require.cache){            
            if(isfilter(key)){
                delete require.cache[key];
                console.log('deleted cache ',key.substring(monitorroot.length+1))
            }
        }
        console.log('now cache,',Object.keys(require.cache).map((value)=>value.substring(monitorroot.length+1)))
        // console.log(require.cache)
        if(clearscreen)
            process.stdout.write('\033c');
        index = require(entry)
        // index.reload && index.reload()
    }catch(e){
        console.log(e.message)        
        // console.trace("Here I am!?")
    }    
}
var entry = '../index.js'
var trace_= false
var clearscreen = true
var monitorroot = '../'
var fexclude
module.exports.run = function run(options){       
    if(options.entryfile)
        entry = options.entryfile
    // index = require(entry) 
    clearscreen =  options.clearscreen                            
    monitorroot = options.monitorroot
    fexclude = options.fexclude
    monitorfile(
        reload
        // (value)=>{return !(value.startsWith('.') || value.includes('NODE_MODULE') || value.includes('.git') )} 
        //||!value.endsWith('.js') || !value.endsWith('.json')
    )    
    // reload()
    index = require(entry)
    // index.start && index.start()
}
function isExclude(value,f){
    return f.exclude.includes(value) || isExcludeEndsWith(value,f) || isExcludeStartsWith(value,f)
}
function isExcludeStartsWith(value,f){
    var r = false
    for(const w of f.excludeStartsWith){
        r = r || value.startsWith(w)
    }
    return r
}
function isExcludeEndsWith(value,f){
    var r = false
    for(const w of f.excludeEndsWith){
        r = r || value.endsWith(w)
    }
    return r
}
function dofilter(dirnames,f){
    dirnames = dirnames.filter((value)=>{
        return !isExclude(value,f) 
        // return !(value.startsWith('.') || value.includes('NODE_MODULE') || value.includes('.git') )
    })
    return dirnames    
}
module.exports.dofilter = dofilter