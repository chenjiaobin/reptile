const express = require('express')
const app = express()
// superagent这个包作为客户端请求代理模块，用他来请求目标页面
const superagent = require('superagent')
const get_fun = require('./util.js')

const nightmare = require('nightmare') //自动化测试包，处理动态页面
const night = nightmare({ show: true }) // show: true 显示内置模拟浏览器

let hotNews = []  //热点新闻
let localNews = []  // 本地新闻

/**
 * [description] 通过superagent这个第三方报的get方法来访问百度新闻首页
 */
superagent.get('http://news.baidu.com/').end((err, res) => {
	if (err) {
		console.log("热点新闻抓取失败")
	} else {
		hotNews = get_fun.getHotNews(res)
	}
})

night.goto('http://news.baidu.com/').wait('div#local_news')
.evaluate(() => document.querySelector('div#local_news').innerHTML)
.then(htmlStr => {
	localNews = get_fun.getLocalNews(htmlStr)
}).catch(err => {
	console.log('本地新闻获取失败')
})

let server = app.listen(3000, function () {
	let host = server.address().address
	let port = server.address().port
	console.log('app is up', host, port)
})

app.get('/', async (req, res, next) => {
	// res.send('hello world')
	// res.send(hotNews)
	res.send({
		hotNews: hotNews,
		localNews: localNews
	})
})