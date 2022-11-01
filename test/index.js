
var check = require('../lib/check.js').check
check(1,1)
check({a:1},{a:1},'haha')
// check({a:1},{a:1,b:2},'haha')
check([1,2],[1,2],'hh')
// t([1]===[1])
var y = [1,2,3]
check(1,1,'ab')
check(1,1,'ab1')
check(3,Object.keys(y).length)
// read & write file stream
// var fs = require('fs')
// var fss = fs.createWriteStream('a.md');
// fss.write("Hi,");
// fss.write("Thank You.");
// fss.end();
// var result;
// var chunks = [];
// var fss = fs.createReadStream('a.md');
// fss.on("data", chunk => chunks.push(Buffer.from(chunk)));
// fss.on("end", () => {console.log(chunks);result=Buffer.concat(chunks).toString("utf-8");check(result,'Hi,Thank You.');chunks=[]});
