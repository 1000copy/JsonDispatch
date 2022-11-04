
const hs= require('./lib/httpserver.js')
var ws  = require('./lib/ws.js')
var timerid;
var api_ ;
module.exports.start = ()=>{
    
    hs.start()
    let sws = ws.start
    sws({
        port: 8095,
        host: 'localhost',
        onReady: function (api) {
            api_ = api
            timerid  = setInterval(function () {
                try{
                    api.sendText(1+Math.round(1024 + 1024 * Math.random()).toString(16))
                }catch(e){
                    console.log(e.message)
                }
                
            }, 2000)
            
        }
    });
    require('./face.js')
};
module.exports.stop = ()=>{
    clearInterval(timerid)
    hs.stop()
    ws.stop()
};
module.exports.reload = (clearscreen)=>{
    // if(process.env['reload']){
    //     process.env['reload'] =false
    //     return
    // }
    if(api_){
        // console.log('notify client reload')
        api_.sendText('reload')
        process.env['reload'] = true
    }
    console.log('reload')
    require('./face.js')
};


