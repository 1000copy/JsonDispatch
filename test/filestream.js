//read & write file stream
var fs = require('fs')
var fss = fs.createWriteStream('a.md');
fss.write("Hi,");
fss.write("Thank You.");
fss.end();
var result;
var chunks = [];
var fss = fs.createReadStream('a.md');
fss.on("data", chunk => chunks.push(Buffer.from(chunk)));
fss.on("end", () => {console.log(chunks);result=Buffer.concat(chunks).toString("utf-8");check(result,'Hi,Thank You.');chunks=[]});