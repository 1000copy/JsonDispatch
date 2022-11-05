var autoload = require('./lib/autoload.js')
var f = {
    exclude:['node_modules','.git','.gitignore','LICENSE','autoload.js','readme.md'],
    excludeStartsWith:['.git','.gitignore'],
    excludeEndsWith:['.md','.json'],
}
var path = require('path')
autoload.run( {
    entryfile:path.resolve('./index.js'),
    clearscreen:true,
    monitorroot:path.resolve('./'),
    fexclude:f,
})