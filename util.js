// cheerio相当于node版本的jquery,主要用来获取抓取到的页面元素和其中的数据信息
const cheerio = require('cheerio')

exports.getHotNews = (res) => {
	let hotNews = []
	// $存放的是整个dom结构
	let $ = cheerio.load(res.text)
	$('div#pane-news ul li a').each((index, ele) => {
		let news = {
			title: $(ele).text(), // 新闻标题
			href: $(ele).attr('href')
		}
		hotNews.push(news)
	})
	return hotNews
}


exports.getLocalNews = (res) => {
	let localNews = []
	let $ = cheerio.load(res)

	// 获取本地新闻
	$('ul#localnews-focus li a').each((index, ele) => {
		let news = {
			title: $(ele).text(),
			href: $(ele).attr('href')
		}
		localNews.push(news)
	})

	// 获取资讯新闻
	$('div#localnews-zixun ul li a').each((index, ele) => {
		let news = {
			title: $(ele).text(),
			href: $(ele).attr('href')
		}
		localNews.push(news)
	})
	return localNews
}