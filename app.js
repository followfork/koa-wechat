'use strict'

var Koa = require('koa')
var wechat = require('./wechat/g')

var config = {
	wechat: {
		appID: '',
		appSecret: '',
		token: ''
	}
}

var app = new Koa()

app.use(wechat(config.wechat))

app.listen(1234)

console.log('listen on 1234')
