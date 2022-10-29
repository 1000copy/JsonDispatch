/* Call Examples
    var rest = {
        resource:"person",
        action:"select",
        params:{fields:['name','age'],condition:{name:"lcj"}}
    }
    var obj = {name:"person",fields:[{name:"name",type:"text primary key"},{name:"age",type:"text"}]}    
    var restresult = [{name:'lcj',age:'18'}]
    var restresult90 = [{name:'lcj',age:'90'}]
    var restInsert = {
            resource:"person",
            action:"insert",
            params:{name:"lcj",age:"18"}
        }
    var restUpdate = {
            resource:"person",
            action:"update",
            params:{value:{age:"90"},condition:"name='lcj'"}
        }
    var restClear = {
            resource:"person",
            action:"clear"        
        }
 */
var jd = require('../lib/.')
var t = require("assert")
t(jd.register)
t(jd.dispatch)
class Obj1{
    get name(){return 'obj1'}
    action1(){
        result = "action1 of obj1 is here"
        // console.log(result)
        return result;
    }
    action2(params){
        return params;
    }
}
jd.register(new Obj1())
var result = jd.dispatch({resource:"obj1",action:"action1",params:{}})
// console.log(result)
t( "action1 of obj1 is here"==result.data)
// console.log(result)
jd.register(new Obj1())
var result = jd.dispatch({resource:"obj1",action:"action2",params:{echo:1}})
t(1==result.data.echo)
var Obj2 ={
    name:"reco",
    action(){
        return 'obj2'
    }
}
jd.register(Obj2)
var r2 = jd.dispatch({resource:'reco',action:'action',params:{}})
// console.log(r2)
t(r2.data=='obj2')
var r2 = jd.dispatch({resource:'reco',action:'noaction'})
t(r2.error == 'no action named noaction')
var Obj3 ={
    name:"reco3",
    action(params){
        return params.name
    }
}
jd.register(Obj3)
var r2 = jd.dispatch({resource:'reco3',action:'action',params:{name:'reco'}})
// console.log(r2)
t(r2.data=='reco')
var r2 = jd.dispatch({resource:'reco3',action:'action'})
// console.log(r2)
t(r2.error == "Cannot read properties of undefined (reading 'name')")
var jd = require('../.')
// console.log(jd)
t(jd.register)
t(jd.dispatch)
