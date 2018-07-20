# reptile
node实现爬虫的简单案例
### 依赖
- express（作为启动服务）
- superagent（这个包作为客户端请求代理模块，用他来请求目标页面）
- superagent-charset （转码，将请求过来的目标数据进行转码）
- nightmare （自动化测试包，处理动态页面）
- cheerio（相当于node版本的jquery,主要用来获取抓取到的页面元素和其中的数据信息）
- async（实现并发请求的关键，使用它的mapLimit这个方法，因为一次性并发请求会被封ip，所以我们可以通过这个方法来设置并发的数量）
|参数|类型|说明|
|:----    |:----- |-----   |
 |coll|Array / Iterable / object|          要迭代的集合
 |limie|number|              一次异步操作的最大数量,也就是并发的数量设置
 |iteratee|AsyncFunction|               对于 coll 中的每一个item，迭代执行该异步函数。用(item, callback)调用，callback可选
 |callback|[ function ]|        所有 iteratee函数完成后或发生错误时触发的回调函数。用(err, results)调用。results可以是iteratee 函数完成后触发callback时传递的项
