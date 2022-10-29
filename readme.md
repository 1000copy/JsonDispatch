
assert.deepequal is required

你们用的什么方法？
我们用的是敏捷方法。
可是你们没做TDD啊
是的，我们选择了一些我们认为的可以做的方法，像是每日站会

我们用的是面对对象方法
可是你们这里那里都没有封装
其实我们用的是结构化方法
可是你们没有结构啊
我说的结构化，指的是我们没有用面向对象方法


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

2. json作为数据库元数据
先只是生产DDL即可，容易测试。容易定接口。
3. 使用json作为对象元数据

4. 使用json作为ui的对象元数据

