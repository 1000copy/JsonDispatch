## Json Dispatcher

可以把规定格式的json转换为对代码的调用。就像这样：

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


## TODO

self test lightweight case
assert.deepequal is required


## 工作日志

过往js代码的模块整理
价值在于，之前是为了app开发，是急就章，现在希望独立为模块，作为自己下一步app开发的固定的知识基础和代码基础。
也想要顺便玩玩npm和模块化。

1. 根据json，调用对象代码。并添加unit test，并发布到npm，name=jsondispatcher。估计时间：3h。

dispatch({params})==return json {success:val,error:"no method name"}
dispatch return 'reco' ,params: {obj:"Person",method:"name",params:{id:1}}
class Person{name(id){return if (id==1)return "reco" else return 'anonymous'}}
register('Person',new Person())

more test
dispatch throw exception,params:{obj:"No register obj",}
dispatch throw exception,params:{obj:"Person",method:"no method",}

## 更多场景

1. json作为数据库元数据
先只是生产DDL即可，容易测试。容易定接口。
2. 使用json作为对象元数据
3. 使用json作为ui的对象元数据

## License 

(gpl3.0)[LICENSE]