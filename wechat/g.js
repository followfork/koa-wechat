'use strick'

var sha1 = require('sha1')
var getRawBody = require('raw-body')
var Wechat = require('./wechat')
var util = require('./util')

module.exports = function(opts, handler) {
	var wechat = new Wechat(opts)

	return function *(next){
		var that = this

		var token = opts.token
		var signature = this.query.signature
		var nonce = this.query.nonce
		var timestamp = this.query.timestamp
		var echostr = this.query.echostr
		var str = [token, timestamp, nonce].sort().join('')
		var sha = sha1(str)

		if(this.method === 'GET') {
			if(sha === signature) {
				this.body = echostr + ''
			} else {
				this.body = 'wrong'     
			}
		} else if(this.method === 'POST') {
			if(sha !== signature) {
				this.body = 'wrong'
				return false
			} 
			
			var data = yield getRawBody(this.req, {
				length: this.length,
				limit: '1mb',
				encoding: this.charset
			})
			// xml2js
			var content = yield util.parseXMLAsync(data)

			// 格式化 js数据
			var message = util.formatMessage(content.xml)
			console.log(message)

			// if(message.MsgType === 'event') {
			// 	if(message.Event === 'subscribe') {
			// 		var now = (new Date().getTime())

			// 		that.status = 200
			// 		that.type = 'application/xml'
			// 		that.body = ''

			// 		// console.log(that.body)
			// 		return 
			// 	}
			// }

			that.weixin = message

			yield handler.call(this, next)  // ***给业务层处理逻辑

			wechat.reply.call(this)

		}
	}
}
