
var check = require('../lib/check.js')
check({a:1},{a:1},'object')
// t([1]===[1])
var y = [1,2,3]
check('1','1','string')
check(1,1,'number')
check([1],[1],'simple array')
check([1,2,3],[1,2,3],'array')
check([1,[2],3],[1,[2],3],'deep array')
check(3,Object.keys(y).length,'len',true)//if trace:true then print stacktree

