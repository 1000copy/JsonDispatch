const { check } = require('./lib/check')
require('./lib/check')
check(1,1,'3')
var r = createtable({table:'a',fields:[{name:'b',type:'varchar1',len:5},{name:'c',type:'varchar',len:5}]})
check('field b type varchar1 is invalid',r.error)
var r = createtable({table:'a',fields:[{name:'b',type:'varchar',len:5},{name:'c',type:'varchar',len:5}]})
check('a (b varchar(5),c varchar(5))',r.result,r.result)
var r = createtable({table:'a',fields:[{name:'b',type:'varchar',len:5},{name:'c',type:'int'}]})
check('a (b varchar(5),c int)',r.result,r.result)
var r = createtable({table:'a',fields:[{name:'b',type:'varchar',len:5},{name:'c',type:'varchar'}]})
check('a (b varchar(5),c varchar(255))',r.result,r.result)
check('a (b,c)',createtable({table:'a',fields:['b','c']}).result,'generate sql test0')
check('options.fields must be fulfilled',createtable({table:'a',fields:[]}).error,'generate sql test1')
check('options must be a object',createtable('').error,'generate sql error type')
check('options.table must be a string',createtable({}).error,'generate sql error params')
function createtable(options){        
    const fieldtypes = ['varchar','int']
    if(!options)
        return {error:'options must be a object'}
    if(!options.table || typeof options.table !='string')
        return {error:'options.table must be a string'}
    if(!options.fields || !Array.isArray(options.fields))
        return {error:'options.fields must be a array'}
    if(options.fields.length < 1 )
        return {error:'options.fields must be fulfilled'}    
    if(typeof options.fields[0] =='string'){
        options.fields = options.fields.map((value)=>''+value+'')
    }else{
        for(const field of options.fields){            
            if (!(fieldtypes.includes(field.type)))
                return {error:`field ${field.name} type ${field.type} is invalid`}
        }
        options.fields = options.fields.map((value)=>{
            if(value.type=='varchar')
                return value.name+` ${value.type}(${value.len||255})`
            else{
                return value.name+` ${value.type}`
            }
        })
    }
    var fields = options.fields.join(',')    
    return {result:`${options.table} (${fields})`}
}