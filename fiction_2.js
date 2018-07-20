const cheerio = require('cheerio')
const express = require('express')
const app = express()
const superagent = require('superagent')
require('superagent-charset')(superagent)

let fiction = []
let url = 'http://www.zwdu.com/xianxia/'

let getFiction = (res) => {
	let url = 'http://www.zwdu.com'
	let fictionTemp = []
	let $ = cheerio.load(res.text)

	$('div#hotcontent .item').each((index, ele) => {
		let temp = {
			title: $(ele).find('dl dt  a').text(),
			author: $(ele).find('dl dt span').text(),
			descript: $(ele).find('dl dd').text(),
			href: url + $(ele).find('.image a').attr('href'),
			imgUrl: url + $(ele).find('.image a img').attr('src')
		}
		fictionTemp.push(temp)
	})
	return fictionTemp
}

superagent.get(url).charset('gbk').end((err, res) => {
	if (err) {
		console.log('抓取失败')
	} else {
		// console.log(res)
		fiction = getFiction(res)
	}
})

app.get('/', async (req, res, next) => {
	res.send(fiction)
})

app.listen(3320, function () {
	console.log('服务已开启')
})