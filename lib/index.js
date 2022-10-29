var resources = {}
function register(obj){
    // resources[obj.name] = new XYZ(db,obj)
    resources[obj.name] = obj;
    // console.log(resources)
    return resources[obj.name]
}
function dispatch(rest){
    // console.log(rest)
    if(!rest.action){
        var obj = resources[rest.resource].obj
        return {name:obj.name,fields:obj.fields}
    }
    else{
        var resource = resources[rest.resource]
        if (resource.obj && resource.obj[rest.action])
            var res = resource.obj[rest.action](rest.params,resource)  
        else
            var res = resource[rest.action](rest.params)
    }
    return res
}
function sync(){
    for (const [key, value] of Object.entries(resources)) {
        value.sync()
    }
}
module.exports.register = register;
module.exports.dispatch = dispatch;
// export default {
//     register,
//     dispatch,
//     sync,
// };
