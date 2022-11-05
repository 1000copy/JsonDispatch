const check= require('checkerrorjs')
// check(1,12,'a')
// var f = {
//     exclude:['node_modules','.git','.gitignore','LICENSE','autoload.js','readme.md'],
//     excludeStartsWith:['.git','.gitignore'],
//     excludeEndsWith:['.md','.json'],
// }
// var fs = require('fs')
// let dirnames = fs.readdirSync('./')    
// var dofilter = require('./lib/autoload').dofilter
// console.log(dofilter(dirnames,f))

require('./autoload')
require('./test/check')